import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../../models/users/users.mongo";

export async function httpSignup(req: Request, res: Response) {
  try {
    const schemaValidation = Joi.object({
      firstName: Joi.string()
        .pattern(/^[\p{L}]+$/u)
        .optional()
        .max(50),
      lastName: Joi.string()
        .pattern(/^[\p{L}]+$/u)
        .optional()
        .max(50),
      companyName: Joi.string()
        .pattern(/^[\p{L}\s]+$/u)
        .optional()
        .max(200),
      email: Joi.string().email().required().max(200),
      password: Joi.string().required().min(8),
    });
    const { firstName, lastName, companyName, email, password } = await schemaValidation.validateAsync(req.body);

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(500).json({ sucess: false, message: "This account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName: firstName ? firstName : null,
      lastName: lastName ? lastName : null,
      fullName: firstName && lastName ? firstName + " " + lastName : null,
      companyName: companyName ? companyName : null,
      email,
      password: hashedPassword,
      userType: companyName ? "Company" : "User",
    });

    await user.save();

    res.status(201).json({ success: true, message: "User successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
}

export async function httpLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || email.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Email can't be empty" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const payload = { id: user._id };
    const key = process.env.JWT_SECRET_KEY!;
    const token = jwt.sign(payload, key, { expiresIn: "90d" });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function httpUpdateProfile(req: Request, res: Response) {
  try {
    const { companyName, email, password, company } = req.body;
    const userId = req.params.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = {
      companyName: companyName ? companyName : null,
      email,
      password: hashedPassword,
      company: company ? company : null,
      updated_at: Date.now(),
    };

    const currentUser = await User.findOneAndUpdate({ _id: userId }, updatedUser, { new: true });

    return res.status(200).json({ currentUser });
  } catch (error) {}
}
