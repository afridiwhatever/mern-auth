import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
dotenv.config();
const app = express();

//database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connnected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

//middleswares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// error handling middlewares
app.use((err, req, res, next) => {
  const { message = "Default Internal Server Error", statusCode = 404 } = err;
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

//server trigger
app.listen(3000, () => {
  console.log("Server running on port 3000!");
});
