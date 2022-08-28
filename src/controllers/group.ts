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
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userFromToken?._id },
      { groups: [...usersExistingGroups, savedGroup._id] },
      { new: true }
    );

    res.json(savedGroup);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message || "signin failed" });
  }
};
