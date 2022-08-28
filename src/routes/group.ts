import express from "express";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  listGroups,
} from "../controllers/group";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.get("/groups", protect, listGroups); // list all of User's groups w/o populated participants
router.get("/groups/:groupId", protect, getGroupById);
router.post("/groups", protect, createGroup);
router.delete("/groups/:groupId", protect, deleteGroup);

export default router;
