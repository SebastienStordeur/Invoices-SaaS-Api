import express from "express";
import { httpSignup, httpLogin, httpUpdateProfile, httpGetUser } from "./users.controller";

const auth = require("../../middlewares/auth");

const usersRouter = express.Router();

/** Get requests */
usersRouter.get("/getUser", auth, httpGetUser);

/** Post requests */
usersRouter.post("/signup", httpSignup);
usersRouter.post("/login", httpLogin);

/** Put Requests */
usersRouter.put("/update/:id", httpUpdateProfile);

export default usersRouter;
