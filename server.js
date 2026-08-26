import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import proxyApp from "./cors-proxy/server.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");

// Use the proxy routes + middleware
app.use(proxyApp);

// Serve the Vite build
app.use(express.static(distPath));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
