import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const EXTERNAL_BASE_URL = "https://laternaerp.smerp.io";
const PORT = process.env.PORT || 3001;

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

function createJsonRpcPayload(method = "call", params = {}) {
  return {
    jsonrpc: "2.0",
    id: Math.floor(Math.random() * 1000),
    method: method,
    params: params,
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

    // Handle Odoo-style error objects inside 200 responses
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

// =========================================================
// 🔐 AUTH ROUTES
// =========================================================
app.post("/api/login", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/auth/login`;
  const payload = { 
    login: req.body.login || req.body.email, 
    password: req.body.password 
  };
  
  const result = await safeFetch(url, { method: "POST", body: payload });
  if (!result.ok) return res.status(result.status || 401).json(result);
  res.json(result.data);
});

// =========================================================
// 🟦 PRODUCT ROUTES (UPDATED)
// =========================================================

/**
 * NEW: Fetch all products using the JSON-RPC call structure
 * Endpoint: http://localhost:3001/api/all-products
 */
app.post("/api/all-products", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/allproduct`;
  
  // Create payload: { jsonrpc: "2.0", method: "call", params: {} }
  const payload = createJsonRpcPayload("call", req.body.params || {});

  const result = await safeFetch(url, {
    method: "POST",
    body: payload,
  });

  if (!result.ok) return res.status(result.status).json(result);

  // Return the data directly. Based on your provided response, 
  // it will contain { success: true, products: [...], pagination: {...} }
  res.json(result.data);
});

// GET version for easier browser testing/simple fetching
app.get("/api/all-products", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/allproduct`;
  const payload = createJsonRpcPayload("call", {});

  const result = await safeFetch(url, {
    method: "POST",
    body: payload,
  });

  if (!result.ok) return res.status(result.status).json(result);
  res.json(result.data);
});

app.get("/api/product_details/:id", async (req, res) => {
  const { id } = req.params;
  const url = `${EXTERNAL_BASE_URL}/api/v1/product_details/${id}`;
  const rpcPayload = createJsonRpcPayload("call", {});

  const result = await safeFetch(url, {
    method: "POST",
    body: rpcPayload,
  });

  if (!result.ok) return res.status(result.status).json(result);

  const p = result.data;
  const normalizedProduct = {
    id: p.id,
    name: p.name || "",
    sku: p.sku || "",
    base_price: Number(p.base_price || 0),
    description: p.description || "",
    image_url: p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `${EXTERNAL_BASE_URL}${p.image_url}`) : null,
    in_stock: p.in_stock === true,
    attributes: p.attributes || [],
  };

  res.json(normalizedProduct);
});

// =========================================================
// 🟨 CATEGORIES
// ===================================================
app.get("/api/categories", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/categories`;
  const payload = createJsonRpcPayload("call", {});

  let result = await safeFetch(url, {
    method: "POST",
    body: payload,
  });

  // Fallback: some servers don't accept POST bodies for this endpoint
  if (!result.ok) {
    result = await safeFetch(url, { method: "GET" });
  }

  if (!result.ok) return res.status(result.status).json(result);

  const categories = Array.isArray(result.data)
    ? result.data
    : result.data?.categories || result.data?.result || result.data?.data || [];

  res.json({ categories });
});

// =========================================================
// 🟪 PROFILE (GET & PATCH)
// =========================================================
app.get("/api/profile", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/profile`;
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

  const body = createJsonRpcPayload("call", {});
  const result = await safeFetch(url, {
    method: "POST",
    headers: { Authorization: authHeader },
    body: body,
  });

  if (!result.ok) return res.status(result.status).json(result);

  const profile = extractAndNormalizeProfile(result.data);
  if (!profile) return res.status(502).json({ error: "Profile data missing from response" });

  res.json(profile);
});

// =========================================================
// 📊 DASHBOARD
// =========================================================

/**
 * Fetches dashboard metrics (carts, orders, revenue)
 * Requires: Authorization: Bearer <token>
 */
app.get("/api/dashboard", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/dashboard`;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  // Your API requires a POST even though we are "getting" data
  const rpcPayload = createJsonRpcPayload("call", {});

  const result = await safeFetch(url, {
    method: "POST",
    headers: { 
      "Authorization": authHeader,
      "Content-Type": "application/json" 
    },
    body: rpcPayload,
  });

  if (!result.ok) {
    return res.status(result.status).json(result);
  }

  // The raw response has a 'data' wrapper based on your example
  const dashboardData = result.data.data || result.data;

  // Optional: Clean up the data for the frontend
  const normalizedDashboard = {
    user: dashboardData.user || "Guest",
    metrics: {
      totalCarts: dashboardData.metrics?.total_carts ?? 0,
      totalOrders: dashboardData.metrics?.total_orders ?? 0,
      abandonedCarts: dashboardData.metrics?.abandoned_carts ?? 0,
      totalRevenue: dashboardData.metrics?.total_revenue ?? 0.0,
      totalDue: dashboardData.metrics?.total_due_amount ?? 0,
      uniqueProducts: dashboardData.metrics?.unique_products_purchased ?? 0
    },
    latestOrders: dashboardData.latest_orders || []
  };

  res.json(normalizedDashboard);
});

// =========================================================
// 🟥 LOGOUT
// =========================================================
app.post("/api/logout", async (req, res) => {
  const url = `${EXTERNAL_BASE_URL}/api/v1/auth/logout`;
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

  const email = req.body?.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const result = await safeFetch(url, {
    method: "POST",
    headers: { Authorization: authHeader },
    body: { email },
  });

  if (!result.ok) return res.status(result.status).json(result);
  res.json(result.data);
});
  
if (process.env.START_PROXY !== "false") {
  app.listen(PORT, () => console.log(`🚀 Proxy running at http://localhost:${PORT}`));
}

export default app;
