import express from "express";
import { PORT } from "./config/env.js";

const app = express();
const port = PORT || 3000

app.listen(port,()=>{
  console.log(`Server has started on http://localhost:${port}`);
  
});

