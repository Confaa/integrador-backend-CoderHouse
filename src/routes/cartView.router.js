import { Router } from "express";
import { getCartPage } from "../controllers/cartView.controller.js";

const router = Router();

router.get("/:cid", getCartPage);

export default router;
