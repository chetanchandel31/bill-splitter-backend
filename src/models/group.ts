import mongoose from "mongoose";
import {
  GroupDocument,
  GroupModel,
  GroupSchema,
} from "../interfaces/mongoose.gen";

/*
structure of a single expense:
{
  expenseTitle: "snakcs",
  lender: {
    user: { _id: "" },
    amountPaidForOwnExpense: 111,
  },
  borrowers: [
    { 
      user: { _id: "" },
      amountBorrowed: 100
      isSettled: false,
      isApprovedByLender: false
    },
  ],
  recordedAt: 111,
}
*/

const groupSchema: GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, unique: true },
  admins: { type: [{ type: "ObjectId", ref: "User" }], default: [] },
  members: { type: [{ type: "ObjectId", ref: "User" }], default: [] },
  expenses: [
    {
      expenseTitle: { type: String, required: true, unique: true },
      lender: {
        user: { type: "ObjectId", ref: "User", required: true },
        amountPaidForOwnExpense: { type: Number, required: true },
      },
      borrowers: [
        {
          user: { type: "ObjectId", ref: "User", required: true },
          amountBorrowed: { type: Number, required: true },
          isSettled: { type: Boolean, default: false },
          isApprovedByLender: { type: Boolean, default: false },
        },
      ],
      recordedAt: { type: Number, required: true },
    },
  ],
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
