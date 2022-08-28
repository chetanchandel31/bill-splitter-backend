import express from "express";
import { createGroup, listGroups } from "../controllers/group";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.get("/groups", protect, listGroups); // list all of User's groups w/o populated participants
// router.get("/groups/:groupId", () => {}); // get group info with participants etc
router.post("/groups", protect, createGroup);
// create, delete and list needed

export default router;
