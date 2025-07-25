import { Report, Claim } from "../models/index.js";
import cloudinary from "../config/cloudinaryConfig.js";
import streamifier from "streamifier";

const submitReport = async (req, res) => {
  try {
    const { product, description, location } = req.body;
    const userId = req.user.id;

    if (!product || !description || !location) {
      return res.status(400).json({ error: "All fields are required." });
    }

    let imageUrl = null;

    if (req.file) {
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "lost_found_reports" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const report = await Report.create({
      product,
      description,
      location,
      image: imageUrl,
      userId,
      status: "pending",
    });

    res.status(201).json(report);
  } catch (err) {
    console.error("Failed to submit report:", err);
    res.status(500).json({ error: "Failed to submit report" });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({ include: Claim });
    res.json(reports);
  } catch (err) {
    console.error("Failed to fetch reports:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

const getUserReports = async (req, res) => {
  try {
    const userId = req.user.id;
    const reports = await Report.findAll({
      where: { userId },
      include: Claim,
    });
    res.json(reports);
  } catch (err) {
    console.error("Failed to fetch user reports:", err);
    res.status(500).json({ error: "Failed to fetch user's reports" });
  }
};

const acceptClaim = async (req, res) => {
  try {
    const { claimId } = req.params;

    await Claim.update(
      { status: "approved" },
      { where: { id: claimId } }
    );

    res.json({ message: "Claim accepted" });
  } catch (err) {
    console.error("Error accepting claim:", err);
    res.status(500).json({ error: "Failed to accept claim" });
  }
};

const deleteClaim = async (req, res) => {
  try {
    const { claimId } = req.params;
    await Claim.destroy({ where: { id: claimId } });
    res.json({ message: "Claim removed" });
  } catch (err) {
    console.error("Error deleting claim:", err);
    res.status(500).json({ error: "Failed to delete claim" });
  }
};

export {
  submitReport,
  getAllReports,
  getUserReports,
  acceptClaim,
  deleteClaim,
};