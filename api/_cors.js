const DEFAULT_ALLOW_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

export function applyCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", DEFAULT_ALLOW_ORIGIN);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }

  return false;
}
