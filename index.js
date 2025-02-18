// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Set the number of redirects
const REDIRECT_COUNT = 5;

// When a user visits '/', start the chain by redirecting to '/path1'
app.get("/", (req, res) => {
//   res.redirect("/path1");
res.send(`Final destination reached`);
});

// // This dynamic route matches paths like '/path1', '/path2', etc.
// // The regular expression (\d+) ensures that only numeric values after "path" are captured.
// app.get("/path:step(\\d+)", (req, res) => {
//   const currentStep = parseInt(req.params.step, 10);

//   if (currentStep < REDIRECT_COUNT) {
//     // If we haven't reached the final step, redirect to the next path.
//     res.redirect(`/path${currentStep + 1}`);
//   } else {
//     // Final destination reached. You can render a page or send a message.
//     res.send(`Final destination reached at /path${currentStep}`);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
