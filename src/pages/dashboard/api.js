const FUNCTIONS_BASE = "/.netlify/functions";

export async function authedFetch(path, options = {}) {
  const widget = window.netlifyIdentity;
  const currentUser = widget && widget.currentUser();
  if (!currentUser) {
    const err = new Error("Not authenticated");
    err.status = 401;
    throw err;
  }

  const token = await currentUser.jwt();
  const res = await fetch(`${FUNCTIONS_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data && data.error) message = data.error;
    } catch {
      // response wasn't JSON — fall back to the generic message
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  return res.status === 204 ? null : res.json();
}

export function sessionExpiredMessage(err) {
  return err.status === 401
    ? "Your session has expired. Please log in again."
    : err.message || "Something went wrong.";
}
