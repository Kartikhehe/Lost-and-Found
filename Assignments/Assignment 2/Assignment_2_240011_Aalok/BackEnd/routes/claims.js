import express from "express";
import multer from "multer";
import { submitClaim, getUserClaims } from "../controllers/claimController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", verifyToken, upload.single("proof"), submitClaim);
router.get("/my", verifyToken, getUserClaims);

export default router;