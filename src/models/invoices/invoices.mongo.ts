import mongoose from "mongoose";

const invoicesSchema = new mongoose.Schema({
  company: {
    type: String,
    maxLength: 200,
    required: true,
  },
  companyAddress: {
    type: String,
    maxLength: 500,
    required: true,
  },
  website: {
    type: String,
    maxLength: 500,
    required: false,
    default: null,
  },
  phoneNumber: {
    type: String,
    maxLength: 20,
    required: true,
  },
  invoiceNumber: {
    type: String,
    maxlength: 10,
    required: true,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  toName: {
    type: String,
    maxLength: 200,
    required: true,
  },
  toAddress: {
    type: String,
    maxLength: 500,
    required: true,
  },
  toEmail: {
    type: String,
    maxLength: 200,
    required: false,
    default: null,
  },
  toNumber: {
    type: String,
    maxLength: 20,
    required: false,
    default: null,
  },
  list: {},
  totalAmount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Invoice", invoicesSchema);
