import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://himashabuilders.com",
      "https://www.himashabuilders.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// DB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Routes
import enquiryRoutes from "./routes/enquiryRoutes.js";
app.use("/api/enquiry", enquiryRoutes);

import bookVisitRoutes from "./routes/bookVisitRoutes.js";
app.use("/api/book-visit", bookVisitRoutes);

import offerRoutes from "./routes/offerRoutes.js";
app.use("/api", offerRoutes);
