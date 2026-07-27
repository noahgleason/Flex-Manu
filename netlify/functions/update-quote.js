"use strict";

const { ID_COLUMN, updateRowById } = require("./lib/google-sheets");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Not authenticated" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { id, fields } = payload;
  if (!id || typeof fields !== "object" || fields === null || Array.isArray(fields)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Request body must include "id" (matching "${ID_COLUMN}") and a "fields" object` }),
    };
  }

  try {
    const updated = await updateRowById(id, fields);
    if (!updated) {
      return { statusCode: 404, body: JSON.stringify({ error: `No quote found for id "${id}"` }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("update-quote: failed to update sheet", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Failed to update quote" }) };
  }
};
