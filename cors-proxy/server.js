import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// ---- MIDDLEWARE ---- //
app.use(express.json()); // allows POST body
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---- Helper function ---- //
async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      method: options.method || "GET",
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("❌ Non-JSON response:", text);
      return { ok: false, status: response.status, error: "Invalid JSON" };
    }

    return { ok: response.ok, status: response.status, data };
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return { ok: false, status: 500, error: "Fetch failed" };
  }
}

// =========================================================
// 🔐 LOGIN (POST)
// =========================================================
app.post("/api/login", async (req, res) => {
  const externalUrl = "http://41.78.157.87:32771/api/v1/auth/login";

  console.log("🔐 Proxying LOGIN request to:", externalUrl);

  const result = await safeFetch(externalUrl, {
    method: "POST",
    body: req.body,
  });

  if (!result.ok)
    return res.status(result.status).json({ error: result.error });

  res.json(result.data);
});

// =========================================================
// 🟦 PRODUCTS
// =========================================================
app.get("/api/products", async (req, res) => {
  const page = req.query.page || 1;
  const externalUrl = `http://41.78.157.87:32771/api/v1/products?page=${page}`;

  console.log("🔵 Fetching products:", externalUrl);

  const result = await safeFetch(externalUrl);

  if (!result.ok) return res.status(result.status).json({ error: result.error });

  res.json(result.data);
});

// =========================================================
// 🟩 CATEGORY
// =========================================================
app.get("/api/category", async (req, res) => {
  const categoryId = req.query.category_id;

  if (!categoryId)
    return res.status(400).json({ error: "category_id is required" });

  const externalUrl = `http://41.78.157.87:32771/api/shop/category?category_id=${categoryId}`;

  console.log("🟢 Fetching category:", externalUrl);

  const result = await safeFetch(externalUrl);

  if (!result.ok) return res.status(result.status).json({ error: result.error });

  res.json(result.data);
});

// =========================================================
// 🟥 PRODUCT DETAILS
// =========================================================
app.get("/api/product_details/:id", async (req, res) => {
  const { id } = req.params;

  const externalUrl = `http://41.78.157.87:32771/api/v1/product_details/${id}`;

  console.log("🔴 Fetching product details:", externalUrl);

  const result = await safeFetch(externalUrl);

  if (!result.ok) {
    console.log("🚨 Product detail backend error:", result);
    return res.status(result.status).json({ error: result.error });
  }

  res.json(result.data);
});

// =========================================================
// 🟪 PROFILE
// =========================================================
app.get("/api/profile", async (req, res) => {
  const externalUrl = "http://41.78.157.87:32771/api/v1/profile";

  console.log("🟣 Fetching profile:", externalUrl);

  const result = await safeFetch(externalUrl);

  if (!result.ok) {
    console.log("🚨 Profile backend error:", result);
    return res.status(result.status).json({ error: result.error });
  }

  res.json(result.data);
});

// =========================================================
// START SERVER
// =========================================================
app.listen(3001, () => {
  console.log("🚀 Proxy running at http://localhost:3001");
});
