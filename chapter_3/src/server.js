import express from "express";
import { PORT } from "./config/env.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.route.js";
import todoRouter from "./routes/todo.route.js";

const app = express();
const port = PORT || 3000;

//Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);

//Get the directory name from the file path

const ___dirname = dirname(__filename);

//Middleware
app.use(express.json());
//Serves the HTML file from the /public directory
//Tells express to serve all files from the public folder as static assets/file. Any request for the css files will be resolved to the public directory.

app.use(express.static(path.join(___dirname, "../public")));

//Serving up the HTML file from the /public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(___dirname, "public", "index.html"));
});
//Routes

app.use("/auth", authRouter);
app.use("/todos", todoRouter);


app.listen(port, () => {
  console.log(`Server has started on http://localhost:${port}`);
});
