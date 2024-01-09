import { chatService, userService } from "../repositories/index.js";

export const sendMessage = async (chatItem) => {
  try {
    const { _id } = await userService.getUserByEmail(chatItem.user);
    await chatService.addMessage({ message: chatItem.message, user: _id });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async () => {
  try {
    const messages = await chatService.getMessages();
    return messages.map((message) => {
      return {
        user: message.user.email,
        message: message.message,
      };
    });
  } catch (error) {
    console.log(error);
  }
};
