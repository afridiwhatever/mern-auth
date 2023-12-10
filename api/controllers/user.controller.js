import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const getUsers = (req, res) => {
  res.json({ message: "Hi from user route" });
};

export const editUser = async (req, res) => {
  const { username, email, password, profilePicture } = req.body;

  try {
    if (!username || !password) {
      res.json({ error: true, message: "Username or password can't be empty" });
      return;
    }

    //check if username already exists
    const isDuplicateUsername = await User.findOne({ username });

    if (isDuplicateUsername) {
      res.json({
        error: true,
        message: "username is taken",
      });
      return;
    }

    //find and update user credentials

    const foundUser = await User.findOne({ email });

    const hashedPassword = bcryptjs.hashSync(password, 10);
    foundUser.username = username;
    foundUser.password = hashedPassword;
    if (foundUser.profilePicture !== profilePicture) {
      foundUser.profilePicture = profilePicture;
    }
    await foundUser.save();
    const updatedUserData = {
      username: foundUser._doc.username,
      email: foundUser._doc.email,
      profilePicture: foundUser._doc.profilePicture,
      success: true,
      message: "User details successfully updated",
    };

    res.status(201).json(updatedUserData);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await User.findOneAndDelete({ email });
    return res.json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
