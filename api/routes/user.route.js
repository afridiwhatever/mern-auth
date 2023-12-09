import { Router } from "express";
import {
  getUsers,
  editUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/edit", editUser);
router.delete("/edit", deleteUser);

export default router;
