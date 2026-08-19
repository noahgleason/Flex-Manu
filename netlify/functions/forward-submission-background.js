"use strict";

const { createQuote } = require("./lib/google-sheets");

// Netlify Forms' outgoing webhook posts submissions here. This is a
// background function: Netlify's infra returns an immediate 202 with no
// retry, so a slow/odd response from us can't trigger a duplicate delivery.
exports.handler = async (event) => {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";

  let data;
  try {
    const payload = JSON.parse(raw);
    data = payload.data || payload;
  } catch (err) {
    console.error("forward-submission-background: failed to parse submission body", err);
    return;
  }

  try {
    const { rfq, customerStatus } = await createQuote(data);
    console.log(`forward-submission-background: created ${rfq} (${customerStatus})`);
  } catch (err) {
    console.error("forward-submission-background: failed to create quote", err);
  }
};
