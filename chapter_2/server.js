import express from "express";
const app = express();
const PORT = 3000;

//Middleware

app.use(express.json());
//HTTP VERBS && Routes (or paths)
app.get("/", (req, res) => {
  res.send("<h1>This is a website</h2>");
});
app.post("/", (req, res) => {
  const body = req.body;

  res.status(201).json(body);
});
app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
