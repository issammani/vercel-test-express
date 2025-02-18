const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // Get current count from query parameter, defaulting to 0
  let count = parseInt(req.query.count, 10) || 0;

  if (count < 10) {
    // Increment the count and redirect to the same URL
    console.log(`Redirecting: count ${count + 1}`);
    res.redirect(`/?count=${count + 1}`);
  } else {
    // After 10 redirects, send a final response
    res.send("Final destination reached after 10 redirects!");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
