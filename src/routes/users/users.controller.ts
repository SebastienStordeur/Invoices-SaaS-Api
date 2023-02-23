import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
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

export async function httpLogin(req: Request, res: Response) {}
