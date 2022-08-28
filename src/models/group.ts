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

groupSchema.methods = {
  isAdmin: function (userId: string) {
    // if not populated way to get id is `admin?.toString()`, otherwise `admin?._id.toString()`
    return this.admins.some(
      (admin) =>
        admin?.toString() === userId || admin?._id.toString() === userId
    );
  },
  isParticipant: function (userId: string) {
    return (
      this.admins.some(
        (admin) =>
          admin.toString() === userId || admin?._id.toString() === userId
      ) ||
      this.members.some(
        (member) =>
          member?.toString() === userId || member?._id.toString() === userId
      )
    );
  },
};

export default mongoose.model<GroupDocument, GroupModel>("Group", groupSchema);
