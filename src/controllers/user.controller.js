import envConfig from "../config/env.config.js";
import { transport } from "../config/mail.config.js";
import UserDTO from "../dto/user.dto.js";
import { userService } from "../repositories/index.js";

export const changeRoleUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { role } = req.user;

    const result = await userService.changeRoleUser(
      uid,
      role === "user" ? "premium" : "user",
    );

    if (!result) return res.sendClientError({ message: "Role not changed!" });

    const user = await userService.getUserById(uid);
    const userDTO = new UserDTO(user);

    return res.sendSuccessWithCookie(userDTO.getJwtToken(), {
      message: "Role changed!",
    });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};

export const uploadDocumentsUser = async (req, res) => {
  const { files } = req.body;
  const { email } = req.user;
  try {
    if (!files) return res.sendClientError({ message: "Files not found!" });

    const user = await userService.getUserByEmail(email);

    if (!user) return res.sendNotFound({ message: "User not found!" });

    const fileForUpload = files.map((file) => {
      return {
        name: file.originalname,
        reference: file.path,
      };
    });

    fileForUpload.forEach(async (file) => {
      let exist = user.documents.find((doc) => doc.name === file.name);
      if (!exist) {
        await userService.uploadDocumentUser(email, file);
      }
    });

    return res.sendSuccess({ message: "Files uploaded!" });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    const usersDTO = users.map((user) => new UserDTO(user).getUserCurrent());
    return res.sendSuccess(usersDTO);
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};

export const deleteUserInactives = async (req, res) => {
  try {
    const users = await userService.getUsers();
    users.forEach(async (user) => {
      if ((user.last_connection - Date.now()) / (1000 * 60 * 60 * 24) > 2) {
        let response = await userService.deleteUser(user.email);

        if (response) {
          console.log(`User ${user.email} deleted!`);
          const result = await transport.sendMail({
            from: `Juan Confalonieri <${envConfig.EMAIL_USER}>`,
            to: user.email,
            subject: "Account Deletion Notification",
            html: `
              <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                  <div style="background-color: #d9534f; color: white; padding: 20px; text-align: center;">
                      <h1 style="margin: 0 0 10px 0;">Account Deletion Due to Inactivity</h1>
                  </div>
                  <div style="padding: 20px;">
                      <p style="font-size: 16px;">Hi ${user.first_name} ${user.last_name},</p>
                      <p style="font-size: 16px; margin-bottom: 20px;">We want to inform you that your account has been deleted due to inactivity for more than two days.</p>
                      <p style="font-size: 16px;">Last connection date: ${user.last_login_date}</p>
                      <p style="font-size: 16px; margin-top: 20px;">If you believe this is a mistake or if you would like to reactivate your account, please contact our support team.</p>
                      <div style="text-align: center; margin-top: 20px;">
                          <a href="${envConfig.EMAIL_USER}" style="background-color: #f0ad4e; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px; transition: background-color 0.3s ease;">Contact Support</a>
                      </div>
                      <p style="font-size: 16px; margin-top: 20px; text-align: center;">We're sorry to see you go and would love to have you back!</p>
                  </div>
              </div>
          `,
          });
          if (result) {
            console.log(`Email sent to ${user.email}`);
          }
        }
      }
    });
    return res.sendSuccess({ message: "Users inactives deleted!" });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};

export const changeRoleAdmin = async (req, res) => {
  try {
    const { uid, role } = req.body;

    const result = await userService.changeRoleUser(uid, role);

    if (!result) return res.sendClientError({ message: "Role not changed!" });

    return res.sendSuccess({ message: "Role changed!" });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const { uid } = req.params;

    const result = await userService.deleteUserById(uid);

    if (!result) return res.sendClientError({ message: "User not deleted!" });

    return res.sendSuccess({ message: "User deleted!" });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
