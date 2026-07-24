const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwpm9WvPZB8FfV9eGOEJh2XEyESX8gF5C_Wum90WaBKelb8Y-qSLAQtSrWNRcYWmo6X/exec";

// Netlify's outgoing webhook expects a fast response and retries on
// timeout/non-2xx, which duplicates rows since Apps Script Web Apps are slow
// and inconsistent to acknowledge even after they've already run. Background
// functions get an immediate 202 from Netlify's own infra (no retry possible)
// and the forward to Apps Script happens after that, so a slow/odd response
// from Apps Script can no longer trigger a duplicate delivery.
exports.handler = async (event) => {
  const body = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64")
    : event.body;

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": event.headers?.["content-type"] || "application/json" },
      body,
    });
  } catch (err) {
    console.error("forward-submission-background: failed to reach Apps Script", err);
  }
};
