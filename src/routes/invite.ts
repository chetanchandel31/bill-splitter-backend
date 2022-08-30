import express from "express";
import { listInvites, sendInvite, settleInvites } from "../controllers/invite";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.post("/invite-send", protect, sendInvite); // send invite
router.get("/invites", protect, listInvites); // list invites
router.post("/invite-settle", protect, settleInvites); // accept / reject

export default router;
