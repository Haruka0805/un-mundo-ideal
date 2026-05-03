// Simple static file server (no build tools required).
// Usage: node serve.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const ROOT = __dirname;
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".svg":
      return "image/svg+xml; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

const server = http.createServer((req, res) => {
  try {
    const parsed = url.parse(req.url || "/");
    const pathname = parsed.pathname || "/";
    const safePath = pathname.replace(/\.\./g, "");

    let filePath = path.join(ROOT, safePath);
    if (pathname.endsWith("/")) {
      filePath = path.join(ROOT, pathname, "index.html");
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      // SPA-ish fallback (optional): route / -> index.html
      if (pathname === "/" || pathname === "") filePath = path.join(ROOT, "index.html");
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }
    }

    const body = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": contentType(filePath) });
    res.end(body);
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(String(e && e.message ? e.message : e));
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Knit gallery server: http://localhost:${PORT}`);
});

