import { Product } from "../dao/mongo/classes/product.dao.js";
import { Cart } from "../dao/mongo/classes/cart.dao.js";
import { User } from "../dao/mongo/classes/user.dao.js";
import ProductRepository from "./product.repository.js";
import CartRepository from "./cart.repository.js";
import UserRepository from "./user.repository.js";
import ChatRepository from "./chat.repository.js";
import { Chat } from "../dao/mongo/classes/chat.dao.js";
import TicketRepository from "./ticket.repository.js";
import { Ticket } from "../dao/mongo/classes/ticket.dao.js";

export const productService = new ProductRepository(new Product());
export const cartService = new CartRepository(new Cart());
export const userService = new UserRepository(new User());
export const chatService = new ChatRepository(new Chat());
export const ticketService = new TicketRepository(new Ticket());
