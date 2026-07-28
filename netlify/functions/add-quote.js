"use strict";

const { APPS_SCRIPT_URL } = require("./lib/apps-script");

const REQUIRED_FIELDS = ["name", "email", "description"];

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Not authenticated" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const missing = REQUIRED_FIELDS.filter((key) => !String(body[key] || "").trim());
  if (missing.length > 0) {
    return { statusCode: 400, body: JSON.stringify({ error: `Missing required field(s): ${missing.join(", ")}` }) };
  }

  const data = {
    name: body.name,
    company: body.company || "",
    email: body.email,
    phone: body.phone || "",
    description: body.description,
    quantity: body.quantity || "",
    file_link: body.file_link || "",
    customer_status: "New Customer",
  };

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const text = await res.text();
    let result = null;
    try {
      result = JSON.parse(text);
    } catch {
      // Apps Script returned something unexpected — handled by the ok check below.
    }

    if (!res.ok || !result || result.status !== "success") {
      console.error("add-quote: Apps Script did not confirm success", res.status, text.slice(0, 500));
      return { statusCode: 502, body: JSON.stringify({ error: "Failed to add quote" }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, rfq: result.rfq, customerStatus: result.customerStatus }),
    };
  } catch (err) {
    console.error("add-quote: failed to reach Apps Script", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Failed to add quote" }) };
  }
};
