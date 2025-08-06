import express from "express";
import multer from "multer";
import {
  getAllReports,
  getUserReports,
  acceptClaim,
  deleteClaim,
  submitReport,
} from "../controllers/reportController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", verifyToken, upload.single("image"), submitReport);
router.get("/", verifyToken, getAllReports);
router.get("/my", verifyToken, getUserReports);
router.put("/claim/:claimId/accept", verifyToken, acceptClaim);
router.delete("/claim/:claimId", verifyToken, deleteClaim);

export default router;