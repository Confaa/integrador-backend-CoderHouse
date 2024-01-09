import { userService } from "../repositories/index.js";

export const getChatPage = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await userService.getUserByEmail(email);
    res.render("chat", { title: "Chat", user: user.email });
  } catch (error) {
    res.sendClientError(error.message);
  }
};
