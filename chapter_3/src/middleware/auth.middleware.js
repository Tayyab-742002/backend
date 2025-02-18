import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        success: false,
        message: "Unauthorized Acess",
      });
    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;
