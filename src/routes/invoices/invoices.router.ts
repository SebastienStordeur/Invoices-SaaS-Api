import express from "express";
import { httpCreateInvoice, httpGetInvoices } from "./invoices.controller";

const invoicesRouter = express.Router();

invoicesRouter.post("/create", httpCreateInvoice);

invoicesRouter.get("/", httpGetInvoices);

export default invoicesRouter;
