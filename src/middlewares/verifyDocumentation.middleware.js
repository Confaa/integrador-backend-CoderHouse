import { userService } from "../repositories/index.js";

export const verifyDocumentation = async (req, res, next) => {
  const { role } = req.user;
  const { email } = req.user;
  if (role === "admin") {
    return res.sendSuccess({ message: "You are admin!" });
  }

  try {
    const user = await userService.getUserByEmail(email);
    const verification = [
      "identification",
      "proof-of-address",
      "proof-of-account",
      "profile",
    ];
    if (!user) return res.sendNotFound({ message: "User not found!" });
    let upload = user.documents.map((doc) => doc.name.split(".")[0]);
    let notUpload = verification.filter((doc) => !upload.includes(doc));

    if (notUpload.length > 0 && role !== "premium") {
      return res.sendUnauthorized(
        `You need to upload all documents! Missing: ${notUpload.map(
          (doc) => doc,
        )}`,
      );
    }
    next();
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
