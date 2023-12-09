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

    const { _id, ...userData } = newUser._doc;
    userData.success = true;
    userData.message = "User created";
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(201)
      .json(userData);
    return;
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

export const google = async (req, res, next) => {
  const { email, displayName, photoURL } = req.body;

  //check if the user exists. If so, sign token and send the user back
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { _id, password, createdAt, updatedAt, __v, ...userData } =
        user._doc;
      userData.success = true;
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
      //if the user doesn't exist, create it, sign token and send it back
      const newUser = new User({
        email,
        displayName,
        profilePicture: photoURL,
        username: " ",
      });
      await newUser.save();

      const { _id, ...userData } = newUser._doc;
      userData.success = true;
      userData.message = "Login Successful";
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        .status(201)
        .json(userData);
      return;
    }
  } catch (error) {
    console.log(error);
    res.send("ee");
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

export const signout = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Signout success" });
};
