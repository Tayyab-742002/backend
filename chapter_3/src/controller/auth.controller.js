import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { JWT_SECRET } from "../config/env.js";
export const registerUser = (req, res) => {
  try {
    const { username, password } = req.body;
    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //save the new User and hashed password to the db
    const insertUser = db.prepare(
      `INSERT INTO USERS (username, password) VALUES (?, ?)`
    );
    const result = insertUser.run(username, hashedPassword);

    //Give a user default todo
    const defaultTodo = "Hello :) Add your first todo";
    const insertTodo = db.prepare(
      "INSERT INTO todos (user_id, task) VALUES (?, ?) "
    );
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // create a token

    const token = jwt.sign({ id: result.lastInsertRowid }, JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
};

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    success: true,
    name: username,
    password: password,
  });
};
