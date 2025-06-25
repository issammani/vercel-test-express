const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/") {
    // Serve index.html
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
    return;
  }

  if (pathname === "/my-pass.pkpass") {
    // Serve the .pkpass file
    const pkpassPath = path.join(__dirname, "my-pass.pkpass");
    const stat = fs.statSync(pkpassPath);

    res.writeHead(200, {
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": "attachment; filename=my-pass.pkpass",
      "Content-Length": stat.size,
    });

    const fileStream = fs.createReadStream(pkpassPath);
    fileStream.pipe(res);
    return;
  }

  // Fallback: 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
