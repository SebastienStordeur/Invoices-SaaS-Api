import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxLength: 50,
  },
  lastName: {
    type: String,
    maxLength: 50,
  },
  fullName: {
    type: String,
    maxLength: 101,
  },
  companyName: {
    type: String,
    maxLength: 200,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 200,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    maxLength: 200,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_ad: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("User", usersSchema);
