import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { UserDocument } from "./interfaces/mongoose.gen";
import { addFakeDelayBeforeResponse } from "./middlewares/addFakeDelayBeforeResponse";
import { errorHandler } from "./middlewares/errorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";
import authRoutes from "./routes/auth";
import expenseRoutes from "./routes/expense";
import groupRoutes from "./routes/group";
import inviteRoutes from "./routes/invite";

dotenv.config();

// to be able to add custom properties to request via middlewares
declare global {
  namespace Express {
    interface Request {
      userFromToken?: UserDocument;
    }
  }
}

const app = express();

// middlewares
app.use(express.json({ limit: "50mb" })); // these let us access req.body, w/o limit property we get "request too large"
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(addFakeDelayBeforeResponse(app.settings.env));

// routes
app.get("/api", (_req, res) => res.send({ name: "bill-splitter", ok: true }));
app.use("/api", authRoutes);
app.use("/api", groupRoutes);
app.use("/api", inviteRoutes);
app.use("/api", expenseRoutes);

// handle errors and 404s
app.use(routeNotFound);
app.use(errorHandler);

// connect with DB and start listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB CONNECTED: BILL_SPLITTER"));
