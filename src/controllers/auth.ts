import { RequestHandler } from "express";
import User from "../models/user";

export const signup: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (password?.length < 6) {
      return res
        .status(400)
        .json({ error: "password should be of atleast 6 characters" });
    }

    const newUser = new User({
      email,
      password,
      name,
    });

    const savedUser = await newUser.save();

    res.json({
      email: savedUser.email,
      name: savedUser.name,
      _id: savedUser._id,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err?.message || "signup failed" });
  }
};
