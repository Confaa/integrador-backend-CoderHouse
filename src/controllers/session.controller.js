import UserDTO from "../dto/user.dto.js";
import { cartService, userService } from "../repositories/index.js";
import { compareHash } from "../utils/crypto.utils.js";
import CustomError from "../errors/custom.error.js";
import { generateUserErrorInfo } from "../errors/info.js";
import ErrorCodes from "../errors/enums.js";
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) return res.sendNotFound({ message: "Login failed" });
    if (!compareHash(password, user.password))
      res.sendClientError({ message: "Login failed" });

    const token = new UserDTO(user).getJwtToken();
    await userService.updateLastConnectionUser(email);
    req.logger.info(`User ${email} login success`);
    return res.sendSuccessWithCookie(token, { message: "Login success" });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;
    if (!first_name || !last_name || !email || !password || !age) {
      CustomError.createError({
        name: "MissingFieldsError",
        cause: generateUserErrorInfo(req.body),
        message: "One or more fields are missing",
        code: ErrorCodes.NOT_FOUND_ERROR,
      });
    }
    const existedUser = await userService.getUserByEmail(req.body.email);
    if (existedUser) return res.sendClientError({ message: "Email existed" });
    const cartForUser = await cartService.addCart();
    req.body.cart = cartForUser._id;
    const user = new UserDTO(req.body);
    const result = await userService.addUser(user);
    if (!result) return res.sendClientError({ message: "Register failed" });
    return res.sendSuccessCreated({ message: "Register success" });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const logoutUser = async (req, res) => {
  const { email } = req.user;
  await userService.updateLastConnectionUser(email);
  req.logger.info(`User ${email} logout success`);
  res.status(200).clearCookie("token").json({ message: "Logout success" });
};

export const getUserCurrent = async (req, res) => {
  try {
    const result = await userService.getUserByEmail(req.user.email);
    res.sendSuccess({ user: new UserDTO(result).getUserCurrent() });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.sendSuccess({ users: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};
