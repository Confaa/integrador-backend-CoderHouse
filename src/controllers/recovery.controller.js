import { transport } from "../config/mail.config.js";
import UserDTO from "../dto/user.dto.js";
import envConfig from "../config/env.config.js";
import { userService } from "../repositories/index.js";
import { compareHash, createHash } from "../utils/crypto.utils.js";
export const sendEmail = async (req, res) => {
  try {
    const emailRegex = /\S+@\S+\.\S+/;
    const { email } = req.query;

    if (!emailRegex.test(email))
      return res.sendClientError({ message: "Invalid email!" });

    const user = await userService.getUserByEmail(email);

    if (!user) return res.sendNotFound({ message: "User not found!" });

    const token = new UserDTO(user).getJwtToken();

    const link = `${envConfig.API}/change-password/${token}`;

    const result = await transport.sendMail({
      from: `Juan Confalonieri <${envConfig.EMAIL_USER}>`,
      to: email,
      subject: "Recovery Password",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #0056b3; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0 0 10px 0;">Recovery Password</h1>
            </div>
            <div style="padding: 20px;">
                <p style="font-size: 16px;">Hi ${user.first_name} ${user.last_name},</p>
                <p style="font-size: 16px; margin-bottom: 20px;">Click on the link below to change your password:</p>
                <div style="text-align: center;">
                    <a href="${link}" style="background-color: #28a745; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px; transition: background-color 0.3s ease;">Change Password</a>
                </div>
                <p style="font-size: 16px; margin-top: 20px;">If the above button does not work, please copy and paste the following link into your browser:</p>
                <p style="font-size: 16px; word-wrap: break-word;">${link}</p>
                <p style="font-size: 16px; margin-top: 20px; text-align: center;">This link will expire in 1 hour.</p>
            </div>
        </div>
    `,
    });

    if (!result) return res.sendSuccess({ message: "Error in send email!" });
    res.sendSuccess({ message: "Email sent successfully!" });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { email } = req.user;
  try {
    if (password !== confirmPassword)
      return res.sendClientError({ message: "Passwords do not match!" });

    const user = await userService.getUserByEmail(email);

    if (compareHash(password, user.password))
      return res.sendClientError({
        message: "The new password cannot be the same as the old one!",
      });

    const hashPassword = createHash(password);

    const result = await userService.updateUser(email, {
      password: hashPassword,
    });

    if (!result)
      return res.sendServerError({ message: "Error in update password!" });

    res.sendSuccess({ message: "Password updated successfully!" });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};
