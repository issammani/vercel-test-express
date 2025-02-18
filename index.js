const express = require("express");
const app = express();
const port = 3000;

// Configure the list of valid paths.
// Add more paths (e.g., '/path2', '/path3') as needed.
const validPaths = ["/", "/path1"];

app.get(validPaths, (req, res) => {
  // Read current redirect count from the query parameter; default to 0.
  let count = parseInt(req.query.count, 10) || 0;
  const currentPath = req.path;

  // Find the index of the current path in the validPaths array.
  const index = validPaths.indexOf(currentPath);
  if (index === -1) {
    // This should not happen if the route is correctly configured.
    return res.status(404).send("Path not configured.");
  }

  // If the count is less than 2, redirect to the next path.
  if (count < 2) {
    // Calculate the next index cyclically.
    const nextIndex = (index + 1) % validPaths.length;
    const nextPath = validPaths[nextIndex];
    console.log(
      `Redirecting from ${currentPath} to ${nextPath} (redirect count: ${
        count + 1
      })`
    );
    res.redirect(`${nextPath}?count=${count + 1}`);
  } else {
    // Final response after 2 redirects.
    res.send(
      `Final destination reached at ${currentPath} after ${count} redirects!`
    );
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
