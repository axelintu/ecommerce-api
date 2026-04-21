import express from "express";
import {
	getOrders,
	getOrderById,
	createOrder,
	updateOrderStatus,
} from "../controllers/orderController.js";
} from "./routesValidation/orderValidation.js";

const router = express.Router();

router.get(
	"/orders",
	getOrders);

router.get(
	"/orders/:id",
	getOrderById,
);

router.post(
	"/orders",
	createOrder,
);

router.put(
	"/orders/:id",
	updateOrderStatus,
);

export default router;
