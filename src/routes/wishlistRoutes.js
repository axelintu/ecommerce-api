import express from "express";
import { body, param } from "express-validator";
import {
	getWishlists,
	getWishlistByUser,
	addProductToWishlist,
	removeProductFromWishlist,
	deleteWishlist,
} from "../controllers/wishlistController.js";
import validate from "../middleware/validation.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
	wishlistIdValidation,
	userIdValidation,
	addProductValidation,
	removeProductValidation,
} from "./routesValidation/wishlistValidation.js";

const router = express.Router();

router.get(
	"/wishlist",
	authMiddleware,
	isAdmin,
	getWishlists
);

router.get(
	"/wishlist/user/:id",
	authMiddleware,
	userIdValidation,
	validate,
	getWishlistByUser,
);

router.post(
	"/wishlist",
	authMiddleware,
	addProductValidation,
	validate,
	addProductToWishlist,
);

router.delete(
	"/wishlist/:id/product",
	authMiddleware,
	removeProductValidation,
	validate,
	removeProductFromWishlist,
);

router.delete(
	"/wishlist/:id",
	authMiddleware,
	wishlistIdValidation,
	validate,
	deleteWishlist,
);

export default router;
