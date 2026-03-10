import fetch from "node-fetch";

const EXTERNAL_BASE_URL = "https://laternaerp.smerp.io";

function createJsonRpcPayload(method = "call", params = {}) {
  return { jsonrpc: "2.0", id: Math.floor(Math.random() * 1000), method, params };
}

async function safeFetch(url, options = {}) {
  const finalBody = options.body ? JSON.stringify(options.body) : undefined;
  const response = await fetch(url, { ...options, body: finalBody });
  const data = await response.json();
  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const payload = createJsonRpcPayload("call", req.body.params || {});
  try {
    const result = await safeFetch(`${EXTERNAL_BASE_URL}/api/v1/allproduct`, { method: "POST", body: payload });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Products fetch failed" });
  }
}