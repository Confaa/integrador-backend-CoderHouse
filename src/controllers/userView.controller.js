import UserDTO from "../dto/user.dto.js";
import { userService } from "../repositories/index.js";

export const getDocumentsPage = async (req, res) => {
  try {
    res.render("documents", { user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAdminUsersPage = async (req, res) => {
  try {
    const users = await userService.getUsers();
    const usersDTO = users.map((user) => {
      return { ...new UserDTO(user).getUserCurrent(), uid: user._id };
    });
    return res.render("adminUsers", {
      users: usersDTO,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
