import mongoose from "mongoose";

const bookVisitSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address: String,
    designType: String,
  },
  { timestamps: true }
);

export default mongoose.model("BookVisit", bookVisitSchema);
