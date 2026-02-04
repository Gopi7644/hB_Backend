import express from "express";
import { createBookVisit } from "../controllers/bookVisitController.js";

const router = express.Router();

router.post("/", createBookVisit);

export default router;
