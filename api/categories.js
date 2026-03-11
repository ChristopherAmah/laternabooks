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
  const data = await response.json();
  return data;
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const payload = createJsonRpcPayload("call", {});

  try {
    const result = await safeFetch(`${EXTERNAL_BASE_URL}/api/v1/categories`, {
      method: "POST",
      body: payload,
    });
    const categories = Array.isArray(result)
      ? result
      : result.categories || result.result || result.data || [];

    res.status(200).json({ categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Categories fetch failed" });
  }
}
