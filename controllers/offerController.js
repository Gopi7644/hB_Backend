import OfferEnquiry from "../models/OfferEnquiry.js";

export const createOfferEnquiry = async (req, res) => {
  try {
    const { name, phone, location, propertyType } = req.body;

    /* ================= FIELD WISE VALIDATION ================= */

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        field: "name",
        message: "Please enter your full name",
      });
    }

    if (!/^[a-zA-Z .]{2,40}$/.test(name.trim())) {
      return res.status(400).json({
        success: false,
        field: "name",
        message: "Name should contain only letters and spaces",
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        field: "phone",
        message: "Please enter your mobile number",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        field: "phone",
        message: "Please enter a valid 10-digit mobile number",
      });
    }

    if (!propertyType) {
      return res.status(400).json({
        success: false,
        field: "propertyType",
        message: "Please select a property type",
      });
    }

    if (!["1 BHK", "2 BHK", "3 BHK", "4+ BHK/Duplex"].includes(propertyType)) {
      return res.status(400).json({
        success: false,
        field: "propertyType",
        message: "Selected property type is invalid",
      });
    }

    /* ================= DB SAVE ================= */

    const enquiry = await OfferEnquiry.create({
      name: name.trim(),
      phone,
      location: location?.trim(),
      propertyType,
    });

    return res.status(201).json({
      success: true,
      message: "Thank you for contacting us. Our team will reach out shortly.",
      data: enquiry,
    });

  } catch (err) {
    console.error("Offer Enquiry Error:", err.message);

    /* ================= MONGOOSE VALIDATION ================= */
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0];
      return res.status(400).json({
        success: false,
        field: firstError.path,
        message: firstError.message,
      });
    }

    /* ================= REAL SERVER ERROR ================= */
    return res.status(500).json({
      success: false,
      message: "Something went wrong on our side. Please try again later.",
    });
  }
};
