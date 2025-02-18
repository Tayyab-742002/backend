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
    console.log("Registration Error : ",error.message);
    res.sendStatus(503);
  }
};

export const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
    const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.get(username);

    if (!user) return res.status(404).send({ message: "User not found" });

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({
        message: "User is not authorized",
      });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" });
    res.status(200).send({
      success: true,
      message: "User is login successfully",
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
};
