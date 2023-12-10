import { Router } from "express";
import {
  getUsers,
  editUserDetails,
  editUserImage,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/edit", editUserDetails);
router.post("/edit/image", editUserImage);
router.delete("/edit", deleteUser);

export default router;
