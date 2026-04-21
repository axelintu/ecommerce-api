import express from "express";
import {
	getOrders,
	getOrderById,
	createOrder,
	updateOrderStatus,
} from "../controllers/orderController.js";
import validate from "../middleware/validation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import {
	orderIdValidation,
	createOrderValidation,
	updateOrderStatusValidation,
} from "./routesValidation/orderValidation.js";

const router = express.Router();

router.get(
	"/orders",
	authMiddleware,
	isAdmin,
	getOrders);

router.get(
	"/orders/:id",
	authMiddleware,
	orderIdValidation,
	validate,
	getOrderById,
);

router.post(
	"/orders",
	authMiddleware,
	createOrderValidation,
	validate,
	createOrder,
);

router.put(
	"/orders/:id",
	authMiddleware,
	updateOrderStatusValidation,
	validate,
	updateOrderStatus,
);

export default router;
