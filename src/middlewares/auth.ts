import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

module.exports = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userId = decodedToken.id;
    if (req.body.userId && req.body.userId !== userId) throw "Incorrect Id";
    else next();
  } catch (error) {
    res.status(401).json({ message: "Unidentified request " + error });
  }
};
