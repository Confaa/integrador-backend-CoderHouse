import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import initPassport from "./config/passport.config.js";
import config from "./config/env.config.js";
import CartRouter from "./routes/cart.router.js";
import CartViewRouter from "./routes/cartView.router.js";
import ProductRouter from "./routes/product.router.js";
import ProductRouterView from "./routes/productView.router.js";
import UserRouter from "./routes/user.router.js";
import UserViewRouter from "./routes/userView.router.js";
import ChatViewRouter from "./routes/chatView.router.js";
import { getMessages, sendMessage } from "./controllers/chat.controller.js";
import TicketViewRouter from "./routes/ticketView.router.js";

// Create Express app
const app = express();

// Configure Express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Cookie parser
app.use(cookieParser());

// Passport config
app.use(passport.initialize());
initPassport();

// Handlebars config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Mount routers
const productRouter = new ProductRouter();
app.use("/api/products", productRouter.getRouter());
const productViewRouter = new ProductRouterView();
app.use("/products", productViewRouter.getRouter());
const cartRouter = new CartRouter();
app.use("/api/carts", cartRouter.getRouter());
const cartViewRouter = new CartViewRouter();
app.use("/carts", cartViewRouter.getRouter());
const userRouter = new UserRouter();
app.use("/api/sessions", userRouter.getRouter());
const userViewRouter = new UserViewRouter();
app.use("/", userViewRouter.getRouter());
const chatViewRouter = new ChatViewRouter();
app.use("/", chatViewRouter.getRouter());
const ticketViewRouter = new TicketViewRouter();
app.use("/tickets", ticketViewRouter.getRouter());

// Connect to database
try {
  const db = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB}`;
  await mongoose.connect(db);
  console.log("Database connected");
} catch (error) {
  console.log(error);
}

// Start the server
const httpServer = app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

// Socket.io
const ioServer = new Server(httpServer);
ioServer.on("connection", async (socket) => {
  socket.emit("getMessages", await getMessages());
  console.log("New connection made with socket: ", socket.id);
  socket.on("addMessage", async (data) => {
    console.log("Message received: ", data);
    await sendMessage(data);
    socket.emit("getMessages", await getMessages());
  });
});
