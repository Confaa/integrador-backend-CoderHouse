import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import config from "./config/env.config.js";
import productRouter from "./routes/product.router.js";
import productViewRouter from "./routes/productView.router.js";
import cartRouter from "./routes/cart.router.js";
import cartViewRouter from "./routes/cartView.router.js";

// Create Express app
const app = express();

// Configure Express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Handlebars config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Mount routers
app.use("/api/products", productRouter);
app.use("/products", productViewRouter);
app.use("/api/carts", cartRouter);
app.use("/carts", cartViewRouter);

// Connect to database
try {
  const db = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB}`;
  await mongoose.connect(db);
  console.log("Database connected");
} catch (error) {
  console.log(error);
}

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
