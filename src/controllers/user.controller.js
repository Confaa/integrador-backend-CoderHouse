import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";
import config from "../config/env.config.js";
import { userService } from "../repositories/index.js";
import { compareHash } from "../utils/crypto.utils.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) return res.sendNotFound({ message: "Login failed" });
    if (!compareHash(password, user.password))
      res.sendClientError({ message: "Login failed" });

    const token = jwt.sign(
      new UserDTO(user).getUserForToken(),
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.sendSuccessWithCookie(token, { message: "Login success" });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const user = new UserDTO(req.body);
  try {
    const result = userService.addUser(user);
    if (!result) return res.sendClientError({ message: "Register failed" });
    res.sendSucces({ message: "Register success" });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.status(200).clearCookie("token").json({ message: "Logout success" });
};
