import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const EXTERNAL_BASE_URL = "https://laternaerp.smerp.io";
const PORT = 3001;

// ---- MIDDLEWARE ---- //
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---- SAFE FETCH UTILITIES ---- //

/**
 * Wraps a payload into the JSON-RPC structure expected by the external API.
 * @param {string} method - The RPC method name to call (e.g., 'call').
 * @param {object} params - The parameters for the RPC method.
 * @returns {object} The JSON-RPC payload.
 */
function createJsonRpcPayload(method = "call", params = {}) {
  return {
    jsonrpc: "2.0",
    id: null, // id can be null or a number, using null for simplicity
    method: method,
    params: params,
  };
}

/**
 * Safely handles fetch requests, focusing on standard HTTP.
 * NOTE: For JSON-RPC, the profile endpoints now manually call createJsonRpcPayload.
 */
async function safeFetch(url, options = {}) {
  // Ensure the body is a stringified object if it exists and is an object.
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
    if (!text) {
      return { ok: false, status: 502, error: "Empty response body" };
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return {
        ok: false,
        status: 502,
        error: "Non-JSON response from backend",
        raw: text.slice(0, 200),
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: data?.error || "Backend error",
        data,
      };
    }

    return { ok: true, status: response.status, data };
  } catch (err) {
    console.error("❌ Proxy connection error:", err);
    return { ok: false, status: 503, error: "Proxy connection failed" };
  }
}

/**
 * Extracts and normalizes the nested profile data from the JSON-RPC response.
 * @param {object} resultData - The full data object from the safeFetch result.
 * @returns {object|null} The normalized profile object or null.
 */
function extractAndNormalizeProfile(resultData) {
    // Traverse the nested JSON-RPC structure: result.data.result.result.profile
    const profile = resultData?.result?.result?.profile;
    
    if (!profile) return null;

    // Normalize false values to empty strings ("") for front-end form fields
    if (profile.partner) {
      Object.keys(profile.partner).forEach((k) => {
        if (profile.partner[k] === false) profile.partner[k] = "";
      });
    }

    // Also normalize top-level fields
    Object.keys(profile).forEach((k) => {
      if (profile[k] === false) profile[k] = "";
    });

    return profile;
}

// =========================================================
// 🔐 LOGIN
// =========================================================
app.post("/api/login", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/auth/login`;
  const result = await safeFetch(url, { method: "POST", body: req.body });
  if (!result.ok) return res.status(result.status).json(result);
  res.json(result.data);
});

// =========================================================
// 🟪 PROFILE (GET) - FIXED
// =========================================================
app.get("/api/profile", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/profile`;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  // FIX: The GET request now sends a POST request with the correct JSON-RPC body
  const body = createJsonRpcPayload("call", {});
  
  const result = await safeFetch(url, {
    method: "POST",
    headers: { Authorization: authHeader },
    body: body, // Send the JSON-RPC payload
  });

  if (!result.ok) return res.status(result.status).json(result);

  const profile = extractAndNormalizeProfile(result.data);
  if (!profile) {
    return res.status(502).json({ error: "Invalid profile response or missing profile data." });
  }

  res.json(profile);
});

// =========================================================
// 🟪 PROFILE (PATCH / UPDATE) - FIXED
// =========================================================
app.patch("/api/profile", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/profile`;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  // FIX: The frontend sends a FLAT object (e.g., {name: "...", street: "..."}).
  // We must wrap this flat object into the JSON-RPC params structure for the external API.
  const updateBody = createJsonRpcPayload("call", req.body);
  
  const result = await safeFetch(url, {
    method: "POST", // Use POST for JSON-RPC updates
    headers: { Authorization: authHeader },
    body: updateBody, // Send the JSON-RPC wrapped payload
  });

  if (!result.ok) return res.status(result.status).json(result);

  const profile = extractAndNormalizeProfile(result.data);
  if (!profile) {
    return res.status(502).json({ error: "Invalid update response or missing profile data." });
  }

  res.json(profile);
});

// =========================================================
// 🟦 PRODUCTS
// =========================================================
app.get("/api/products", async (req, res) => {
  const page = req.query.page || 1;
  const url = `${EXTERNAL_BASE_URL}/api/v1/products?page=${page}`;
  const result = await safeFetch(url);
  if (!result.ok) return res.status(result.status).json(result);
  res.json(result.data);
});

// =========================================================
// 🟩 CATEGORY
// =========================================================
app.get("/api/category", async (req, res) => {
  const { category_id } = req.query;
  if (!category_id)
    return res.status(400).json({ error: "category_id required" });

  const url = `${EXTERNAL_BASE_URL}/api/shop/category?category_id=${category_id}`;
  const result = await safeFetch(url);
  if (!result.ok) return res.status(result.status).json(result);
  res.json(result.data);
});


// =========================================================
// 🟥 PRODUCT DETAILS (GET) - JSON-RPC COMPATIBLE
// =========================================================
app.get("/api/product_details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Product ID is required" });

    const externalUrl = `${EXTERNAL_BASE_URL}/api/v1/product_details/${id}`;
    console.log(`📡 Fetching external URL: ${externalUrl}`);

    const response = await fetch(externalUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "PostmanRuntime/7.29.2",
      },
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("❌ External error body:", text);
      return res.status(response.status).json({ error: "Remote error", details: text });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ Invalid JSON response:", text.slice(0, 200));
      return res.status(502).json({ error: "Invalid JSON response", raw: text.slice(0, 200) });
    }

    // ---- UNWRAP JSON-RPC RESULT ---- //
    // Some ERP responses wrap product details inside data.result.products
    const productData = data?.result?.products?.[0] ?? data?.products?.[0];
    if (!productData) {
      return res.status(404).json({ error: "Product not found in response" });
    }

    // Normalize fields for React
    const normalizedProduct = {
      id: productData.id ?? null,
      name: productData.name ?? "Unknown Product",
      base_price: Number(productData.price ?? 0),
      description: productData.description || "No description provided.",
      image_url: productData.image_url
        ? `https://laternaerp.smerp.io${productData.image_url}`
        : placeholderImg,
      inStock:
        productData.in_stock === true ||
        (typeof productData.stock === "number" && productData.stock > 0),
      attributes: productData.attributes || [],
    };

    res.json(normalizedProduct);
  } catch (error) {
    console.error("🔥 Proxy error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// =========================================================
// 📊 DASHBOARD (PROXY)
// =========================================================
app.get("/api/dashboard", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/dashboard`;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  // Exact JSON-RPC payload as requested by your API
  const rpcPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {}
  };

  console.log(`📡 Forwarding Dashboard request to: ${url}`);

  const result = await safeFetch(url, {
    method: "POST", // The external API requires POST for JSON-RPC
    headers: { 
      Authorization: authHeader,
      "Content-Type": "application/json"
    },
    body: rpcPayload,
  });

  if (!result.ok) {
    console.error("❌ Dashboard Proxy Error:", result.error);
    return res.status(result.status).json(result);
  }

  // Sending back the raw data to the frontend
  res.json(result.data);
});

// =========================================================
// 🚀 START SERVER
// =========================================================
app.listen(PORT, () => {
  console.log(`🚀 Proxy running at http://localhost:${PORT}`);
});