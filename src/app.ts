import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { addFakeDelayBeforeResponse } from "./middlewares/addFakeDelayBeforeResponse";
import { errorHandler } from "./middlewares/errorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";

dotenv.config();

const app = express();

// middlewares
app.use(express.json({ limit: "50mb" })); // these let us access req.body, w/o limit property we get "request too large"
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(addFakeDelayBeforeResponse(app.settings.env));

// routes
app.get("/api", (req, res) =>
  res.send({ name: "bill-splitter", status: "ok" })
);

// handle errors and 404s
app.use(routeNotFound);
app.use(errorHandler);

// connect with DB and start listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB CONNECTED: BILL_SPLITTER"));
