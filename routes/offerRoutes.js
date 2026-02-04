import express from "express";
import { createOfferEnquiry } from "../controllers/offerController.js";

const router = express.Router();

router.post("/offer-enquiry", createOfferEnquiry);

export default router;
