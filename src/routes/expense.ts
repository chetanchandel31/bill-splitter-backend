import express from "express";
import { expenseAdd, expenseApprove } from "../controllers/expense";
import { protect } from "../middlewares/protect";

const router = express.Router();

// create an expense (lender)
// settle an expense (borrower)
// approve an expense (lender)

router.post("/expenses", protect, expenseAdd);
router.patch("/expenses/:expenseId/settle", protect, expenseApprove);
router.patch(
  "/expenses/:expenseId/borrowers/:borrowerId/approve",
  protect,
  expenseApprove
);

export default router;
