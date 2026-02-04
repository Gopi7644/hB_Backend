import BookVisit from "../models/BookVisit.js";
import { transporter } from "../config/email.js";

export const createBookVisit = async (req, res) => {
  try {
    const { name, phone, address, designType } = req.body;

    /* ================= VALIDATIONS ================= */

    if (!name || !phone || !address || !designType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit Indian mobile number",
      });
    }

    if (address.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Please enter a complete address",
      });
    }

    const allowedDesigns = [
      "Home",
      "Flat",
      "Modular Kitchen",
      "Shop",
      "Any Others",
    ];

    if (!allowedDesigns.includes(designType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid design type selected",
      });
    }

    /* ================= SAVE TO DB ================= */

    const visit = await BookVisit.create({
      name: name.trim(),
      phone,
      address: address.trim(),
      designType,
    });

    /* ================= EMAIL ================= */

    try {
      await transporter.sendMail({
        from: `"Himasha Builders Website" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "🏠 New Site Visit Booking - Himasha Builders",
        html: `
          <div style="font-family:Arial;padding:15px">
            <h2 style="color:#d4af37">New Site Visit Booking</h2>
            <p><strong>Name:</strong> ${visit.name}</p>
            <p><strong>Phone:</strong> ${visit.phone}</p>
            <p><strong>Address:</strong> ${visit.address}</p>
            <p><strong>Design Type:</strong> ${visit.designType}</p>
            <hr/>
            <p>This request came from Himasha Builders website.</p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error("Email Failed:", mailErr);
      // Email fail ho jaye to bhi booking cancel nahi karte
    }

    /* ================= RESPONSE ================= */

    res.status(201).json({
      success: true,
      message: "Site visit booked successfully",
    });

  } catch (error) {
    console.error("Book Visit Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
