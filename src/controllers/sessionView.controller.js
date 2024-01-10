import { userService } from "../repositories/index.js";
import UserDTO from "../dto/user.dto.js";

export const homePage = async (req, res) => {
  if (req.user) return res.redirect("/current");
  return res.redirect("/login");
};

export const loginPage = (req, res) => {
  const { failSession, logout, passwordChanged, forgotPassword } = req.query;
  return res.render("login", {
    title: "Login",
    failSession,
    logout,
    passwordChanged,
    forgotPassword,
  });
};

export const registerPage = (req, res) => {
  return res.render("register", {
    title: "Register",
  });
};

export const getUserCurrentPage = async (req, res) => {
  const { email } = req.user;
  let user = await userService.getUserByEmail(email);
  const uid = user._id;
  user = new UserDTO(user).getUserCurrent();
  return res.render("current", {
    title: "Current User",
    user,
    uid,
  });
};
