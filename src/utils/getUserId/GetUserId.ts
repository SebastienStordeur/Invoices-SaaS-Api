import { Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export async function getUserId(req: Request, res: Response) {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userId = decodedToken.id;
    console.log(userId);

    return userId;
  } catch (error) {
    console.log("Error middlewaure", error);
  }
}
