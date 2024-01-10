import nodemailer from "nodemailer";
import envConfig from "./env.config.js";

export const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: envConfig.EMAIL_USER,
    pass: envConfig.EMAIL_PASS,
  },
});
