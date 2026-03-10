import fetch from "node-fetch";

const EXTERNAL_BASE_URL = "https://laternaerp.smerp.io";

// ---------------- SAFE FETCH ---------------- //
function createJsonRpcPayload(method = "call", params = {}) {
  return {
    jsonrpc: "2.0",
    id: Math.floor(Math.random() * 1000),
    method,
    params,
  };
}

async function safeFetch(url, options = {}) {
  const finalBody =
    options.body !== undefined && options.body !== null
      ? typeof options.body === "object"
        ? JSON.stringify(options.body)
        : options.body
      : undefined;

  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
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
  } catch (err) {
    console.error("❌ Proxy connection error:", err);
    return { ok: false, status: 503, error: "Proxy connection failed" };
  }
}

// ---------------- VERCEL HANDLER ---------------- //
export default async function handler(req, res) {
  // ---------------- CORS ---------------- //
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    // Preflight request
    return res.status(200).end();
  }

  try {
    const { method, body, query } = req;

    // ---------- ALL PRODUCTS ----------
    if (req.url.includes("/all-products")) {
      const url = `${EXTERNAL_BASE_URL}/api/v1/allproduct`;
      const payload = createJsonRpcPayload("call", method === "POST" ? body?.params || {} : {});

      const result = await safeFetch(url, { method: "POST", body: payload });
      if (!result.ok) return res.status(result.status).json(result);

      return res.status(200).json(result.data);
    }

    // ---------- PRODUCT DETAILS ----------
    if (req.url.startsWith("/product_details/") || req.url.includes("/product_details")) {
      const id = query.id || body?.id;
      if (!id) return res.status(400).json({ error: "Missing product id" });

      const url = `${EXTERNAL_BASE_URL}/api/v1/product_details/${id}`;
      const rpcPayload = createJsonRpcPayload("call", {});
      const result = await safeFetch(url, { method: "POST", body: rpcPayload });
      if (!result.ok) return res.status(result.status).json(result);

      const p = result.data;
      const normalizedProduct = {
        id: p.id,
        name: p.name || "",
        sku: p.sku || "",
        base_price: Number(p.base_price || 0),
        description: p.description || "",
        image_url: p.image_url ? (p.image_url.startsWith("http") ? p.image_url : `${EXTERNAL_BASE_URL}${p.image_url}`) : null,
        in_stock: p.in_stock === true,
        attributes: p.attributes || [],
      };
      return res.status(200).json(normalizedProduct);
    }

    // ---------- LOGIN ----------
    if (req.url.includes("/login")) {
      const url = `${EXTERNAL_BASE_URL}/api/v1/auth/login`;
      const payload = { login: body.login || body.email, password: body.password };
      const result = await safeFetch(url, { method: "POST", body: payload });
      if (!result.ok) return res.status(result.status).json(result);
      return res.status(200).json(result.data);
    }

    // ---------- PROFILE ----------
    if (req.url.includes("/profile")) {
      const url = `${EXTERNAL_BASE_URL}/api/v1/profile`;
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

      const payload = createJsonRpcPayload("call", {});
      const result = await safeFetch(url, { method: "POST", headers: { Authorization: authHeader }, body: payload });
      if (!result.ok) return res.status(result.status).json(result);

      return res.status(200).json(result.data);
    }

    // ---------- DASHBOARD ----------
    if (req.url.includes("/dashboard")) {
      const url = `${EXTERNAL_BASE_URL}/api/v1/dashboard`;
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

      const rpcPayload = createJsonRpcPayload("call", {});
      const result = await safeFetch(url, { method: "POST", headers: { Authorization: authHeader }, body: rpcPayload });
      if (!result.ok) return res.status(result.status).json(result);

      return res.status(200).json(result.data);
    }

    // Fallback
    res.status(404).json({ error: "Route not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}