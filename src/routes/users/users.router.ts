import express from "express";
import { httpSignup, httpLogin } from "./users.controller";

const usersRouter = express.Router();

/** Post requests */
usersRouter.post("/signup", httpSignup);

export default usersRouter;
