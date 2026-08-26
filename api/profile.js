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

function extractAndNormalizeProfile(resultData) {
  const profile = resultData?.profile;
  if (!profile) return null;

  const normalize = (obj) => {
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (obj[key] === false) {
        newObj[key] = "";
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        newObj[key] = normalize(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  return normalize(profile);
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

  const rpcPayload = createJsonRpcPayload("call", {});

  try {
    if (req.method === "GET") {
      const result = await safeFetch(`${EXTERNAL_BASE_URL}/api/v1/profile`, {
        method: "POST",
        headers: { Authorization: authHeader },
        body: rpcPayload,
      });

      const profile = extractAndNormalizeProfile(result.data);
      if (!profile) return res.status(502).json({ error: "Profile data missing" });

      return res.status(200).json(profile);
    }

    const updateResult = await safeFetch(`${EXTERNAL_BASE_URL}/api/v1/profile`, {
      method: "PATCH",
      headers: { Authorization: authHeader },
      body: req.body || {},
    });

    return res.status(200).json(updateResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Profile fetch failed" });
  }
}
