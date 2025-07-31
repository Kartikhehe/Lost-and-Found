import cloudinary from "../config/cloudinaryConfig.js";
import streamifier from "streamifier";
import Claim from "../models/Claim.js";
import Report from "../models/Report.js";

export const submitClaim = async (req, res) => {
  try {
    const { reportId, name, phone, email, reason } = req.body;
    const UserId = req.user.id;
    let proof = null;

    // Upload proof to Cloudinary if present
    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "lost_found_claims" },
            (error, result) => {
              if (result) resolve(result.secure_url);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      proof = await streamUpload();
    }

    const claim = await Claim.create({
      ReportId: reportId,
      UserId,
      name,
      phone,
      email,
      reason,
      proof,
    });

    res.status(201).json(claim);
  } catch (err) {
    console.error("❌ Claim submission failed:", err);
    res.status(500).json({ error: "Failed to submit claim" });
  }
};

export const getUserClaims = async (req, res) => {
  try {
    const UserId = req.user.id;

    const claims = await Claim.findAll({
      where: { UserId },
      include: [
        {
          model: Report,
          attributes: ["id", "product", "description", "location", "image"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(claims);
  } catch (err) {
    console.error("❌ Failed to fetch user claims:", err);
    res.status(500).json({
      error: "Something went wrong while fetching your claims.",
    });
  }
};