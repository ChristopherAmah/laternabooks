import fetch from "node-fetch";
import { applyCors } from "./_cors.js";

const EXTERNAL_BASE_URL = "https://laternaerp.smerp.io";

function createJsonRpcPayload(method = "call", params = {}) {
  return { jsonrpc: "2.0", id: Math.floor(Math.random() * 1000), method, params };
}

async function safeFetch(url, options = {}) {
  const finalBody = options.body ? JSON.stringify(options.body) : undefined;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: finalBody,
  });

  const text = await response.text();
  if (!text) return { ok: false, status: 502, error: "Empty response body" };

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, status: 502, error: "Non-JSON response", raw: text.slice(0, 100) };
  }

  if (data.error) {
    return { ok: false, status: 400, error: data.error.message || "RPC Error", data };
  }

  if (!response.ok) {
    return { ok: false, status: response.status, error: data?.error || "Backend error", data };
  }

  return { ok: true, status: response.status, data };
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const payload = {
    login: req.body.login || req.body.email,
    password: req.body.password,
  };

  try {
    const result = await safeFetch(`${EXTERNAL_BASE_URL}/api/v1/auth/login`, { method: "POST", body: payload });
    if (!result.ok) return res.status(result.status).json(result);
    res.status(200).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login proxy failed" });
  }
}
