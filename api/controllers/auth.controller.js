import User from "../models/user.model.js";
import errorCreator from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
  const { username, password } = req.body;

  if (!username) {
    res.status(400).json({ message: "Username or email is required!" });
    return;
  }
  try {
    const matchedUser = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!matchedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordValid = bcryptjs.compareSync(
      password,
      matchedUser.password
    );
    if (isPasswordValid) {
      const token = jwt.sign({ id: matchedUser._id }, process.env.JWT_SECRET);
      const { _id, password, createdAt, updatedAt, __v, ...userData } =
        matchedUser._doc;
      userData.message = "Login Successful";

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        })
        .status(201)
        .json(userData);

      return;
    } else {
      res.status(401).json({ message: "Incorrect credentials. Try again!" });
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
