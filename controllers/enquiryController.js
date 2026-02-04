import Enquiry from "../models/Enquiry.js";
import { transporter } from "../config/email.js";

export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    /* ================= VALIDATION ================= */

    if (!name || !email || !phone || !service || !message) {
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

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid 10-digit Indian mobile number",
      });
    }

    if (service.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid service",
      });
    }

    if (message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 5 characters",
      });
    }

    /* ================= SAVE TO DB ================= */

    const enquiry = new Enquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service: service.trim(),
      message: message.trim(),
    });

    await enquiry.save();

    /* ================= SEND EMAIL ================= */

    await transporter.sendMail({
      from: `"Himasha Builders Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Admin email
      subject: "🔥 New Enquiry Received - Himasha Builders",
      html: `
        <div style="font-family:Arial,sans-serif;">
          <h2 style="color:#d4af37;">New Enquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message}</p>
          <hr/>
          <p>This enquiry was submitted from your website.</p>
        </div>
      `,
    });

    /* ================= RESPONSE ================= */

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
    });

  } catch (error) {
    console.error("Enquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error, enquiry not sent",
    });
  }
};
