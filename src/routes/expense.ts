import express from "express";
import { expenseAdd } from "../controllers/expense";
import { protect } from "../middlewares/protect";

const router = express.Router();

// create an expense (lender)
// settle an expense (borrower)
// approve an expense (lender)

router.post("/expenses", protect, expenseAdd);
router.patch("/expenses/:expenseId/settle", protect, () => {});
router.patch("/expenses/:expenseId/approve", protect, () => {});

export default router;
