import express from "express";
import cors from "cors";
import helmet from "helmet";
import usersRouter from "./routes/users/users.router";
import invoicesRouter from "./routes/invoices/invoices.router";

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use("/user", usersRouter);
app.use("/invoice", invoicesRouter);

export default app;
