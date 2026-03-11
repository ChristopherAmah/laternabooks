import fetch from "node-fetch";
import { applyCors } from "./_cors.js";

const EXTERNAL_BASE_URL = "https://laternaerp.smerp.io";

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
  const data = await response.json();
  return data;
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const result = await safeFetch(`${EXTERNAL_BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: { Authorization: authHeader },
      body: { email },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Logout proxy failed" });
  }
}
