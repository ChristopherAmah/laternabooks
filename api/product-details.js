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
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "Product ID required" });

  const rpcPayload = createJsonRpcPayload("call", {});

  try {
    const result = await safeFetch(`${EXTERNAL_BASE_URL}/api/v1/product_details/${id}`, { method: "POST", body: rpcPayload });

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

    res.status(200).json(normalizedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Product fetch failed" });
  }
}