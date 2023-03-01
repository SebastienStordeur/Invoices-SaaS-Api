import { Request, Response } from "express";
import fs from "fs";
import PDFDocument from "pdfkit";
import Invoice from "../../models/invoices/invoices.mongo";

export async function httpCreateInvoice(req: Request, res: Response) {
  try {
    const { sender, recipient, products } = req.body;

    const invoice = new Invoice({
      company: sender.company,
      companyAddress: sender.companyAddress,
      website: sender.website,
      phoneNumber: sender.phoneNumber,
      toName: recipient.name,
      toAddress: recipient.address,
      toEmail: recipient.email,
      toNumber: recipient.phoneNumber,
      list: products,
      invoiceNumber: "#INV001",
      totalAmount: 2500,
      userId: "63f72d2f82f9bd7faabca14d",
    });

    invoice.save().then((bill) => {
      res.status(201).json({ invoice: bill });
    });
  } catch {}

  //const doc = new PDFDocument();

  // doc.pipe(res);

  // for (let value in sender) {
  //   doc.text(sender[value]);
  //   doc.moveDown(1);
  // }

  // doc.text("BILL TO");
  // for (let value in recipient) {
  //   doc.text(recipient[value]);
  //   doc.moveDown(1);
  // }

  // for (let product of products) {
  //   doc.text(product.title);
  //   doc.moveDown(1);
  // }
  // doc.pipe(fs.createWriteStream("./src/files/output.pdf"));
  // doc.end();

  /** Move the pdf creation to a side function */
}

export async function httpGetInvoices(req: Request, res: Response) {
  try {
    const userId = "63f72d2f82f9bd7faabca14d";

    const invoices = await Invoice.find({ userId: userId });
    console.log(invoices);
    res.status(200).json({ success: true, invoices });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
}
