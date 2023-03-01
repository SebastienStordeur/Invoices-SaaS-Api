import express from "express";
import { httpSignup, httpLogin, httpUpdateProfile } from "./users.controller";

const usersRouter = express.Router();

/** Post requests */
usersRouter.post("/signup", httpSignup);
usersRouter.post("/login", httpLogin);

/** Put Requests */
usersRouter.put("/update/:id", httpUpdateProfile);

export default usersRouter;
