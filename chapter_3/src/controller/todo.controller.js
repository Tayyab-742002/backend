import db from "../db.js";
export const getAllTodos = (req, res) => {
  const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  const todos = getTodos.all(req.userId);
  res.status(200).json(todos);
};
export const createTodo = (req, res) => {
  const { task } = req.body;
  const insertTodo = db.prepare(
    `INSERT INTO todos (user_id, task) VALUES (?, ?)`
  );

  insertTodo.run(req.userId, task);
  res.status(201).json({ id: insertTodo.lastInsertRowid, task, completed: 0 });
};
export const updateTodo = (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
};
export const deleteTodo = (req, res) => {};
