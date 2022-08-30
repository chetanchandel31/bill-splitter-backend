import jwt from "jsonwebtoken";
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
    res.status(500).json({ error: err?.message || "signup failed" });
  }
};

export const signin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "user not found" });

    if (user?.getEncryptedPassword(password) !== user?.encryptedPassword)
      return res.status(400).json({ error: "incorrect details" });

    // generate token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET as string);

    // put token in cookie
    res.cookie("token", token); // TODO: currently it never expires, can make it better

    res.json({
      token,
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err?.message || "signin failed" });
  }
};
