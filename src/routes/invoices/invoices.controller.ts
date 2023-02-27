import { Request, Response } from "express";
import fs from "fs";
import PDFDocument from "pdfkit";
import Invoice from "../../models/invoices/invoices.mongo";

export async function httpCreateInvoice(req: Request, res: Response) {
  const { products } = req.body;
  const doc = new PDFDocument();

  //doc.title = 'New PDF'
  //doc.pipe(fs.createWriteStream("../../files"));
  doc.pipe(res);

  doc.text("HEELLO");
  for (let product of products) {
    doc.text(product.title);
  }
  doc.pipe(fs.createWriteStream("./src/files/output.pdf"));
  doc.end();
}
