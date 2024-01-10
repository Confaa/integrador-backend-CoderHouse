import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = "";
    if (file.originalname.includes("profile")) {
      folder = "profile";
    } else if (
      file.originalname.includes("identification") ||
      file.originalname.includes("proof") ||
      file.originalname.includes("account") ||
      file.originalname.includes("address") ||
      file.originalname.includes("profile")
    ) {
      folder = "documents";
    } else {
      folder = "products";
    }
    const uploadPath = path.join("./public/uploads", folder);

    fs.mkdirSync(uploadPath, { recursive: true });

    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    let name = file.originalname.toLowerCase().split(" ")[0];

    if (name.includes("identification")) {
      name = "identification";
      file.originalname = `identification.${file.originalname
        .split(".")
        .pop()}`;
    } else if (name.includes("proof") && name.includes("address")) {
      name = "proof-of-address";
      file.originalname = `proof-of-address.${file.originalname
        .split(".")
        .pop()}`;
    } else if (name.includes("proof") && name.includes("account")) {
      name = "proof-of-account";
      file.originalname = `proof-of-account.${file.originalname
        .split(".")
        .pop()}`;
    } else if (name.includes("profile")) {
      name = "profile";
      file.originalname = `profile.${file.originalname.split(".").pop()}`;
    } else {
      callback(null, false);
    }
    callback(
      null,
      `${Date.now()}-${name}-${req.user.email}.${file.originalname
        .split(".")
        .pop()}`,
    );
  },
});
export const upload = multer({ storage }).array("files");
