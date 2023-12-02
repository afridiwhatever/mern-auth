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

export const signin = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    res.status(400).json({ message: "Username or email is required" });
    return;
  }
  try {
    const foundUser = await User.findOne({ $or: [{ username }, { email }] });
    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordValid = await bcryptjs.compareSync(
      password,
      foundUser.password
    );
    if (isPasswordValid) {
      res.status(201).json({ message: "Succesful" });
      return;
    } else {
      res.status(401).json({ message: "Username of password is wrong" });
      return;
    }
  } catch (error) {
    next(
      errorCreator(
        400,
        `Failed to log in, Reason: ${error.message || "Internal Server Error"}`
      )
    );
  }
};
