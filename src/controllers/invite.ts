import { RequestHandler } from "express";
import Group from "../models/group";
import User from "../models/user";

export const sendInvite: RequestHandler = async (req, res) => {
  const { invitedUserName, groupId } = req.body;
  const inviterUserId = req.userFromToken?._id.toString();

  try {
    const group = await Group.findOne({ _id: groupId });
    const invitedUser = await User.findOne({ name: invitedUserName });
    const invitedUserId = invitedUser?._id.toString();

    if (!invitedUser) {
      return res.status(404).json({
        error: "user not found, please check spelling",
      });
    }

    if (!group) {
      return res.status(404).json({
        error: "group not found",
      });
    }

    if (!group?.isAdmin(inviterUserId)) {
      return res.status(401).json({
        error: "you need to be an admin to perform this action",
      });
    }

    if (group?.isParticipant(invitedUserId)) {
      return res.status(400).json({
        error: "this user is already part of the group",
      });
    }

    const existingInvites = invitedUser?.invites || [];
    // check if already invited, by same user and to same group
    const inviteToSameGroupBySamePerson = existingInvites.find((invite) => {
      const isInvitedBySamePerson =
        invite?.invitedBy?.toString() === inviterUserId;
      const isInvitedToSameGroup =
        invite?.invitedTo?.toString() === group._id.toString();

      return isInvitedBySamePerson && isInvitedToSameGroup;
    });

    if (inviteToSameGroupBySamePerson) {
      return res.status(400).json({
        error: "you have already invited the user to same group",
      });
    }

    await User.findOneAndUpdate(
      { _id: invitedUserId },
      {
        invites: [
          ...existingInvites,
          { invitedBy: inviterUserId, invitedTo: group._id },
        ],
      },
      { new: true }
    );

    res.json({
      ok: true,
      message: `invite sent to ${invitedUser?.name} successfully`,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message || "failed to send invite" });
  }
};

export const listInvites: RequestHandler = async (req, res) => {
  const userId = req.userFromToken?._id.toString();

  try {
    const user = await User.findOne({ _id: userId }).populate(
      "invites.invitedBy invites.invitedTo",
      "email name _id groupName admins members"
    );

    res.json(user?.invites);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message || "failed to list invites" });
  }
};

export const settleInvites: RequestHandler = async (req, res) => {
  const { inviteId, doReject } = req.body;

  // look for the invite we are dealing with
  const userId = req.userFromToken?._id.toString();
  const user = req.userFromToken;
  const invites = user?.invites || [];
  const invite = invites.find((invite) => invite?._id?.toString() === inviteId);

  if (!invite) {
    return res.status(404).json({ error: "invite does not exist" });
  }

  try {
    const group = await Group.findOne({
      _id: invite?.invitedTo?.toString(),
    });

    if (!doReject) {
      // add user to group if `doReject` false
      const existingMembers = group?.members ?? [];

      await Group.findOneAndUpdate(
        { _id: invite?.invitedTo?.toString() },
        { members: [...existingMembers, req.userFromToken?._id] },
        { new: true }
      );

      if (!group) {
        return res.status(404).json({ error: "group does not exist" });
      }
    }

    // remove invite from User, regardless of reject/accept
    // add group to user if `onReject` false
    const usersGroups = user?.groups || [];

    await User.findOneAndUpdate(
      { _id: userId },
      {
        invites: invites.filter(
          (invite) => invite?._id?.toString() !== inviteId
        ),
        ...(doReject ? {} : { groups: [...usersGroups, invite?.invitedTo] }),
      },
      { new: true }
    );

    res.json({
      ok: true,
      inviteStatus: doReject ? "rejected" : "accepted",
      message: doReject
        ? `invitation to ${group?.groupName} rejected`
        : `joined ${group?.groupName}, you can find it in your groups list now`,
    });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ error: error?.message || "failed to settle invite" });
  }
};
