import express from "express";
const app = express();
const PORT = 3000;

//HTTP VERBS && Routes (or paths)
app.get("/", (req, res) => {
  res.send("<h1>This is a website</h2>");
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
