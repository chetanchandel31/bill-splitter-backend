import mongoose from "mongoose";
import {
  GroupDocument,
  GroupModel,
  GroupSchema,
} from "../interfaces/mongoose.gen";

const groupSchema: GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, unique: true },
  admins: { type: [{ type: "ObjectId", ref: "User" }], default: [] },
  members: { type: [{ type: "ObjectId", ref: "User" }], default: [] },
});

export default mongoose.model<GroupDocument, GroupModel>("Group", groupSchema);
