import express from "express";
import { httpCreateInvoice } from "./invoices.controller";

const invoicesRouter = express.Router();

invoicesRouter.post("/create", httpCreateInvoice);

export default invoicesRouter;
