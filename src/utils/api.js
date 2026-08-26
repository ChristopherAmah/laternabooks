// Central API helper for login, profile, dashboard
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:3001/api" : "/api");

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
