import User from "../models/user.model.js";
import errorCreator from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hasdedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hasdedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(
      errorCreator(
        500,
        `Failed to create user, Reason: ${
          error.message || "Internal Server Error"
        }`
      )
    );
  }
};
