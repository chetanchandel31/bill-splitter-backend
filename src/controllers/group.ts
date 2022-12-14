import { RequestHandler } from "express";
import Group from "../models/group";
import User from "../models/user";

export const createGroup: RequestHandler = async (req, res) => {
  const { groupName } = req.body;

  try {
    // add user to group
    const group = new Group({ groupName, admins: [req.userFromToken?._id] });
    const savedGroup = await group.save();

    // add group to user
    const usersExistingGroups = req.userFromToken?.groups || [];
    await User.findOneAndUpdate(
      { _id: req.userFromToken?._id },
      { groups: [...usersExistingGroups, savedGroup._id] },
      { new: true }
    );

    res.json(savedGroup);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message || "failed to create group" });
  }
};

// TODO: it shouldn't send expenses array
export const listGroups: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.userFromToken?._id).populate("groups");

    res.json(user?.groups);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message || "failed to list groups" });
  }
};

export const deleteGroup: RequestHandler = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.userFromToken?._id.toString();

  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group?.isAdmin(userId)) {
      return res
        .status(401)
        .json({ error: "you need to be admin to perform this action" });
    }

    await Group.findByIdAndRemove(groupId);

    res.json(group);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message || "failed to delete group" });
  }
};

export const getGroupById: RequestHandler = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.userFromToken?._id.toString();

  try {
    const group = await Group.findOne({ _id: groupId }).populate(
      "admins members",
      "email name _id"
    );

    if (!group?.isParticipant(userId)) {
      return res.status(401).json({
        error: "you need to be a part of the group to see it's details",
      });
    }

    res.json(group);
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ error: error?.message || "failed to get group details" });
  }
};
