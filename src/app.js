import express from "express";
import config from "./config/env.config.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";

// Create Express app
const app = express();

// Configure Express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
