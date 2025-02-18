import express from "express";

import db from "../db.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controller/todo.controller.js";

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
export default router;
