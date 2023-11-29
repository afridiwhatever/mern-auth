import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connnected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000!");
});

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
