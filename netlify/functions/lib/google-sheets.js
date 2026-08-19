"use strict";

// Talks to the Google Sheets API directly over REST using a service-account
// JWT (no googleapis dependency needed — keeps the function bundle small).
// Auth: GOOGLE_SERVICE_ACCOUNT_KEY (the full service-account JSON key, as a
// single env var string) + GOOGLE_SHEET_ID (the spreadsheet ID).
//
// Rows are identified by a unique "RFQ #" column rather than sheet row
// position, since rows shift around as people delete/insert.

const crypto = require("node:crypto");

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const ID_COLUMN = "RFQ #";

// Sheet layout: row 1 is a title, row 2 a description, row 3 blank, row 4
// the real column headers, and data starts on row 5.
const HEADER_ROW = 4;

function base64url(buffer) {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const claims = base64url(
    Buffer.from(
      JSON.stringify({
        iss: key.client_email,
        scope: SCOPE,
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
      })
    )
  );
  const signature = base64url(
    crypto.createSign("RSA-SHA256").update(`${header}.${claims}`).sign(key.private_key)
  );

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token exchange failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()).access_token;
}

async function sheetsRequest(path, options = {}) {
  const token = await getAccessToken();
  const res = await fetch(`${SHEETS_API}/${process.env.GOOGLE_SHEET_ID}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Sheets API error (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

function columnLetter(index) {
  let letter = "";
  let n = index;
  while (n >= 0) {
    letter = String.fromCharCode((n % 26) + 65) + letter;
    n = Math.floor(n / 26) - 1;
  }
  return letter;
}

// Loads the first tab's title + internal sheetId, the header row (row
// HEADER_ROW), and every data row after it.
async function loadSheet() {
  const meta = await sheetsRequest("?fields=sheets.properties");
  const { sheetId, title } = meta.sheets[0].properties;
  const data = await sheetsRequest(`/values/${encodeURIComponent(title)}`);
  const rows = data.values || [];
  const headers = rows[HEADER_ROW - 1] || [];
  const dataRows = rows.slice(HEADER_ROW);
  return { sheetId, title, headers, dataRows };
}

function findEmailHeader(headers) {
  return headers.find((h) => /^e-?mail$/i.test(String(h).trim()));
}

// Click-to-open mailto: link addressed to the row's own email column, with
// the rest of the row's fields listed in the body. Nothing is sent unless
// someone actually clicks it and hits send in their own mail client.
function buildMailto(headers, quote) {
  const emailKey = findEmailHeader(headers);
  const email = emailKey ? quote[emailKey] : "";
  if (!email) return null;

  const subject = quote[ID_COLUMN] ? `Re: Quote request ${quote[ID_COLUMN]}` : "Re: Your quote request";
  const body = headers
    .filter((h) => h !== emailKey)
    .map((h) => `${h}: ${quote[h] ?? ""}`)
    .join("\n");

  return (
    `mailto:${encodeURIComponent(email)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

async function fetchAllRows() {
  const { headers, dataRows } = await loadSheet();
  if (headers.length === 0) return [];

  return dataRows.map((row) => {
    const quote = {};
    headers.forEach((key, i) => {
      quote[key] = row[i] ?? "";
    });
    quote.mailto = buildMailto(headers, quote);
    return quote;
  });
}

async function findRow(id) {
  const { sheetId, title, headers, dataRows } = await loadSheet();
  if (headers.length === 0) return null;
  const idIndex = headers.indexOf(ID_COLUMN);
  if (idIndex === -1) {
    throw new Error(`Column "${ID_COLUMN}" not found in row ${HEADER_ROW} (the header row)`);
  }
  const dataIndex = dataRows.findIndex((row) => String(row[idIndex] ?? "") === String(id));
  if (dataIndex === -1) return null;
  return { sheetId, title, headers, rowNumber: dataIndex + HEADER_ROW + 1 };
}

async function updateRowById(id, fields) {
  const found = await findRow(id);
  if (!found) return false;
  const { title, headers, rowNumber } = found;

  const data = Object.keys(fields)
    .map((key) => {
      const colIndex = headers.indexOf(key);
      if (colIndex === -1) return null;
      return { range: `${title}!${columnLetter(colIndex)}${rowNumber}`, values: [[fields[key]]] };
    })
    .filter(Boolean);

  if (data.length === 0) return false;

  await sheetsRequest("/values:batchUpdate", {
    method: "POST",
    body: JSON.stringify({ valueInputOption: "USER_ENTERED", data }),
  });
  return true;
}

function nextRfqNumber(headers, dataRows) {
  const idIndex = headers.indexOf(ID_COLUMN);
  if (idIndex === -1) {
    throw new Error(`Column "${ID_COLUMN}" not found in row ${HEADER_ROW} (the header row)`);
  }

  let max = 0;
  for (const row of dataRows) {
    const match = /RFQ-(\d+)/i.exec(String(row[idIndex] ?? ""));
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > max) max = n;
    }
  }

  return `RFQ-${String(max + 1).padStart(4, "0")}`;
}

function resolveCustomerStatus(headers, dataRows, data) {
  if (data.customer_status === "Returning Customer") return "Returning Customer";

  const emailIndex = headers.indexOf("Email");
  const companyIndex = headers.indexOf("Company");
  const email = String(data.email || "").trim().toLowerCase();
  const company = String(data.company || "").trim().toLowerCase();

  const matches = dataRows.some((row) => {
    const rowEmail = emailIndex === -1 ? "" : String(row[emailIndex] ?? "").trim().toLowerCase();
    const rowCompany = companyIndex === -1 ? "" : String(row[companyIndex] ?? "").trim().toLowerCase();
    return (email && rowEmail === email) || (company && rowCompany === company);
  });

  return matches ? "Returning Customer" : "New Customer";
}

function extractFileLink(data) {
  if (data.attachment && typeof data.attachment === "object" && data.attachment.url) {
    return data.attachment.url;
  }
  if (typeof data.attachment === "string" && data.attachment.trim()) {
    return data.attachment;
  }
  return data.file_link || data.file || "";
}

async function createQuote(data) {
  const { title, headers, dataRows } = await loadSheet();

  const rfq = nextRfqNumber(headers, dataRows);
  const customerStatus = resolveCustomerStatus(headers, dataRows, data);

  const values = {
    "RFQ #": rfq,
    "Date Submitted": new Date().toISOString().slice(0, 10),
    "Customer Name": data.name,
    "Company": data.company,
    "Email": data.email,
    "Phone": data.phone,
    "Part #/Description": data.description || data.message,
    "Quantity": data.quantity,
    "File Link": extractFileLink(data),
    "Status": "New",
    "Quoted Price": "",
    "Quote Sent Date": "",
    "PO Received Date": "",
    "Completion Date": "",
    "Notes": "",
    "Customer Status": customerStatus,
  };

  const row = headers.map((header) => values[header] ?? "");

  await sheetsRequest(
    `/values/${encodeURIComponent(title)}!A${HEADER_ROW + 1}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({ values: [row] }),
    }
  );

  return { rfq, customerStatus };
}

async function deleteRowById(id) {
  const found = await findRow(id);
  if (!found) return false;

  await sheetsRequest(":batchUpdate", {
    method: "POST",
    body: JSON.stringify({
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: found.sheetId,
              dimension: "ROWS",
              startIndex: found.rowNumber - 1,
              endIndex: found.rowNumber,
            },
          },
        },
      ],
    }),
  });
  return true;
}

module.exports = { ID_COLUMN, fetchAllRows, createQuote, updateRowById, deleteRowById };
