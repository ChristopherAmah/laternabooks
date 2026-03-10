// Central API helper for login, profile, dashboard
const API_BASE = "/api"; // Vercel serverless root

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || data?.error || "API request failed");
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: "GET" }),
  post: (endpoint, body) => request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  patch: (endpoint, body) => request(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
};