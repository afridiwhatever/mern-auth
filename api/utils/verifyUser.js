import jwt from "jsonwebtoken";
import errorCreator from "./error.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorCreator(401, "No Token"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorCreator(403, "Unauthorized"));
    req.user = user;
    next();
  });
};
