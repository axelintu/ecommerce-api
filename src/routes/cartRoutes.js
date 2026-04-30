import express from "express";
import {
	getCartById,
	getCartByUser,
	createCart,
	updateCart,
	addProductToCart,
	deleteCart,
} from "../controllers/cartController.js";
import validate from "../middleware/validation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import {
	cartIdValidation,
	userIdValidation,
	createCartValidation,
	putCartValidation,
	addToCartValidation
} from "./routesValidation/cartValidation.js";
import checkOwnership from "../middleware/checkOwnershipById.js";
import Cart from "../models/Cart.js";
const checkCartOwnership = checkOwnership(Cart, "Cart");

const router = express.Router();

/* router.get(
	"/",
	authMiddleware,
	checkCartOwnership,
	getCarts
);
*/

router.get(
	"/:id",
	authMiddleware,
	cartIdValidation,
	checkCartOwnership,
	validate,
	getCartById,
);

router.get(
	"/user/:id",
	authMiddleware,
	userIdValidation,
	validate,
	getCartByUser,
);

router.post(
	"/",
	authMiddleware,
	createCartValidation,
	validate,
	createCart,
);

router.put(
	"/:id",
	authMiddleware,
	checkCartOwnership,
	putCartValidation,
	validate,
	updateCart,
);

router.put(
	"/add/:id",
	authMiddleware,
	checkCartOwnership,
	addToCartValidation,
	validate,
	addProductToCart,
);

router.delete(
	"/:id",
	authMiddleware,
	cartIdValidation,
	checkCartOwnership,
	validate,
	deleteCart,
);

export default router;
