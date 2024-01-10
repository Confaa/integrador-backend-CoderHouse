import multer from "multer";
import { upload } from "../config/multer.config.js";

export const uploadFiles = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload files." });
    }

    req.body.files = req.files;
    next();
  });
};
