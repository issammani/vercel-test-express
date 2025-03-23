const http = require("http");
const url = require("url");

// 20 MB file size in bytes
const fileSize = 20 * 1024 * 1024;

// Generate a 40MB buffer filled with random bytes
const randomContent = Buffer.alloc(fileSize);
for (let i = 0; i < fileSize; i++) {
  randomContent[i] = Math.floor(Math.random() * 256);
}

const server = http.createServer((req, res) => {
  // Parse query parameters to check if we should omit the Content-Length header
  const queryObject = url.parse(req.url, true).query;
  // If ?noCL=true is set, do not send the Content-Length header
  const sendContentLength = !(queryObject.noCL === "true");

  res.setHeader("Content-Type", "application/octet-stream");

  if (sendContentLength) {
    res.setHeader("Content-Length", fileSize);
  }

  // Send the random content as the response
  res.end(randomContent);
});

server.listen(4000, () => {
  console.log("Server listening on http://localhost:3000");
  console.log("Request with ?noCL=true to omit the Content-Length header.");
});
