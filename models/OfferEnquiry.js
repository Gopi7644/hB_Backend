import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 40,
      match: [/^[A-Za-z .]+$/, "Your entered name is invalid"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: 60,
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("OfferEnquiry", offerSchema);
