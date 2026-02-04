import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    service: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
