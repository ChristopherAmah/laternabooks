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
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

  const rpcPayload = createJsonRpcPayload("call", {});

  try {
    const result = await safeFetch(`${EXTERNAL_BASE_URL}/api/v1/dashboard`, {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: rpcPayload,
    });

    const dashboardData = result.data?.data || result.data;

    const normalizedDashboard = {
      user: dashboardData.user || "Guest",
      metrics: {
        totalCarts: dashboardData.metrics?.total_carts ?? 0,
        totalOrders: dashboardData.metrics?.total_orders ?? 0,
        abandonedCarts: dashboardData.metrics?.abandoned_carts ?? 0,
        totalRevenue: dashboardData.metrics?.total_revenue ?? 0.0,
        totalDue: dashboardData.metrics?.total_due_amount ?? 0,
        uniqueProducts: dashboardData.metrics?.unique_products_purchased ?? 0,
      },
      latestOrders: dashboardData.latest_orders || [],
    };

    res.status(200).json(normalizedDashboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Dashboard fetch failed" });
  }
}