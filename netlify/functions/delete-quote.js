"use strict";

const { ID_COLUMN, deleteRowById } = require("./lib/google-sheets");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST" && event.httpMethod !== "DELETE") {
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

  const { id } = payload;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: `Request body must include "id" (matching "${ID_COLUMN}")` }) };
  }

  try {
    const deleted = await deleteRowById(id);
    if (!deleted) {
      return { statusCode: 404, body: JSON.stringify({ error: `No quote found for id "${id}"` }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("delete-quote: failed to delete row", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Failed to delete quote" }) };
  }
};
