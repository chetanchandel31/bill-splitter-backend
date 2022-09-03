import { RequestHandler } from "express";
import Group from "../models/group";

/*
Expense title
1. share of expense             
(?you)paid on their behalf   

2. share of expense
amount due to `userName`

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

{
  groupId: "",
  expenseTitle: "",
  amountPaidForOwnExpense: 111,
  borrowers : [{ userId: "", amountBorrowed: 11 }],

}

*/

export const expenseAdd: RequestHandler = async (req, res) => {
  const { groupId, expenseTitle, amountPaidForOwnExpense, borrowers } =
    req.body;
  const userId = req.userFromToken?._id.toString();

  try {
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return res.status(404).json({ error: "group not found" });
    }

    if (!group?.isParticipant(userId)) {
      return res.status(401).json({
        error: "you need to be a part of the group to add an expense",
      });
    }

    const existingExpenses = group.expenses || [];

    const newExpense = {
      expenseTitle,
      lender: {
        user: userId,
        amountPaidForOwnExpense,
      },
      borrowers,
      recordedAt: Date.now(),
    };

    await Group.findOneAndUpdate(
      { _id: groupId },
      { expenses: [...existingExpenses, newExpense] },
      { new: true }
    );

    // TODO: return newly created expense
    res.json({ ok: true });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message || "failed to add expense" });
  }
};

export const expenseSettle: RequestHandler = async (req, res) => {
  const { groupId } = req.body;
  const { expenseId } = req.params;
  const userId = req.userFromToken?._id.toString();

  try {
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return res.status(404).json({ error: "group not found" });
    }

    if (!group?.isParticipant(userId)) {
      return res.status(401).json({
        error: "you need to be a part of the group to settle an expense",
      });
    }

    const existingExpenses = group.expenses || [];
    const expense = existingExpenses.find(
      (expense) => expense?._id?.toString() === expenseId
    );

    if (!expense) {
      return res.status(404).json({ error: "no such expense found" });
    }

    // TODO: check if borrower(i.e. req sender) even exists on expense, check if expense already settled

    await Group.findOneAndUpdate(
      { _id: groupId },
      {
        expenses: [...existingExpenses].map((expense) => {
          if (expense?._id?.toString() === expenseId) {
            return {
              ...expense,
              borrowers: expense.borrowers.map((borrower) => {
                if (borrower?.user?._id?.toString() === userId) {
                  return { ...borrower, isSettled: true };
                }

                return borrower;
              }),
            };
          }

          return expense;
        }),
      },
      { new: true }
    );

    res.json({ ok: true });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ error: error?.message || "failed to settle expense" });
  }
};

export const expenseApprove: RequestHandler = async (req, res) => {
  const { groupId } = req.body;
  const { expenseId, borrowerId } = req.params;
  const userId = req.userFromToken?._id.toString();

  try {
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return res.status(404).json({ error: "group not found" });
    }

    if (!group?.isParticipant(userId)) {
      return res.status(401).json({
        error: "you need to be a part of the group to approve an expense",
      });
    }

    const existingExpenses = group.expenses || [];
    const expense = existingExpenses.find(
      (expense) => expense?._id?.toString() === expenseId
    );

    if (!expense) {
      return res.status(404).json({ error: "no such expense found" });
    }

    if (expense?.lender?.user?._id?.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "only the lender of an expense can settle it" });
    }

    // TODO: check if borrowerId even exists on expense, check if expense already approved

    await Group.findOneAndUpdate(
      { _id: groupId },
      {
        expenses: [...existingExpenses].map((expense) => {
          if (expense?._id?.toString() === expenseId) {
            return {
              ...expense,
              borrowers: expense.borrowers.map((borrower) => {
                if (borrower?.user?._id?.toString() === borrowerId) {
                  return { ...borrower, isApprovedByLender: true };
                }

                return borrower;
              }),
            };
          }

          return expense;
        }),
      },
      { new: true }
    );

    res.json({ ok: true });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ error: error?.message || "failed to approve expense" });
  }
};
