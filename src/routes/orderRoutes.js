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
import checkOwnership from "../middleware/checkOwnershipById.js";
import Order from "../models/Order.js";
const checkOrderOwnership = checkOwnership(Order, "Order");

const router = express.Router();

router.get(
	"/",
	authMiddleware,
	getOrders);

router.get(
	"/:id",
	authMiddleware,
	checkOrderOwnership,
	orderIdValidation,
	validate,
	getOrderById,
);

router.post(
	"/",
	authMiddleware,
	createOrderValidation,
	validate,
	createOrder,
);

router.put(
	"/:id",
	authMiddleware,
	updateOrderStatusValidation,
	validate,
	checkOrderOwnership,
	updateOrderStatus,
);

export default router;
