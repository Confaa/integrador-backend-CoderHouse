import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import swaggerUiExpress from "swagger-ui-express";
import initPassport from "./config/passport.config.js";
import envConfig from "./config/env.config.js";
import CartRouter from "./routes/cart.router.js";
import CartViewRouter from "./routes/cartView.router.js";
import ProductRouter from "./routes/product.router.js";
import ProductRouterView from "./routes/productView.router.js";
import ChatViewRouter from "./routes/chatView.router.js";
import { getMessages, sendMessage } from "./controllers/chat.controller.js";
import TicketViewRouter from "./routes/ticketView.router.js";
import RecoveryRouter from "./routes/recovery.router.js";
import RecoveryViewRouter from "./routes/recoveryView.router.js";
import SessionViewRouter from "./routes/sessionView.router.js";
import SessionRouter from "./routes/session.router.js";
import UserRouter from "./routes/user.router.js";
import UserViewRouter from "./routes/userView.router.js";
import { eq } from "./helpers/eq.helper.js";
import { addLogger } from "./logger/custom.logger.js";
import specs from "./config/swagger.config.js";

// Create Express app
const app = express();

// Configure Express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Logger
app.use(addLogger);

// Cookie parser
app.use(cookieParser());

// Passport config
app.use(passport.initialize());
initPassport();

// Handlebars config
app.engine(
  "handlebars",
  handlebars.engine({
    helpers: {
      eq,
    },
  }),
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Docs
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Mount routers
const productRouter = new ProductRouter();
app.use("/api/products", productRouter.getRouter());
const productViewRouter = new ProductRouterView();
app.use("/products", productViewRouter.getRouter());
const cartRouter = new CartRouter();
app.use("/api/carts", cartRouter.getRouter());
const cartViewRouter = new CartViewRouter();
app.use("/carts", cartViewRouter.getRouter());
const sessionRouter = new SessionRouter();
app.use("/api/sessions", sessionRouter.getRouter());
const sessionViewRouter = new SessionViewRouter();
app.use("/", sessionViewRouter.getRouter());
const chatViewRouter = new ChatViewRouter();
app.use("/", chatViewRouter.getRouter());
const ticketViewRouter = new TicketViewRouter();
app.use("/tickets", ticketViewRouter.getRouter());
const recoveryRouter = new RecoveryRouter();
app.use("/api/recovery", recoveryRouter.getRouter());
const recoveryViewRouter = new RecoveryViewRouter();
app.use("/", recoveryViewRouter.getRouter());
const userRouter = new UserRouter();
app.use("/api/users", userRouter.getRouter());
const userViewRouter = new UserViewRouter();
app.use("/", userViewRouter.getRouter());

// Connect to database
try {
  const db = `mongodb+srv://${envConfig.DB_USER}:${envConfig.DB_PASS}@${envConfig.DB}`;
  await mongoose.connect(db);
  console.log("Database connected");
} catch (error) {
  console.log(error);
}

// Start the server
const httpServer = app.listen(envConfig.PORT, () => {
  console.log(`Server running on port ${envConfig.PORT}`);
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
