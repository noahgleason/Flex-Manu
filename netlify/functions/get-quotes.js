"use strict";

const { fetchAllRows } = require("./lib/google-sheets");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Not authenticated" }) };
  }

  try {
    const quotes = await fetchAllRows();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quotes }),
    };
  } catch (err) {
    console.error("get-quotes: failed to read sheet", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Failed to read quotes" }) };
  }
};
