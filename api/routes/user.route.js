import { Router } from "express";
import {
  getUsers,
  editUserDetails,
  editUserImage,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = Router();

router.get("/", getUsers);
router.post("/edit", verifyUser, editUserDetails);
router.post("/edit/image", verifyUser, editUserImage);
router.delete("/edit", verifyUser, deleteUser);

export default router;
