import express from "express";
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
	/**
	 * #swagger.tags = ['Wishlist']
	 */
	"/",
	authMiddleware,
	isAdmin,
	getWishlists
);

router.get(
	/**
	 * #swagger.tags = ['Wishlist']
	 */
	"/user/:userId",
	authMiddleware,
	userIdValidation,
	validate,
	getWishlistByUser,
);

router.post(
	/**
 * #swagger.tags = ['Wishlist']
 */
	"/",
	authMiddleware,
	addProductValidation,
	validate,
	addProductToWishlist,
);

router.delete(
	/**
	 * #swagger.tags = ['Wishlist']
	 */
	"/:id/product",
	authMiddleware,
	removeProductValidation,
	validate,
	removeProductFromWishlist,
);

router.delete(
	/**
	 * #swagger.tags = ['Wishlist']
	 */
	"/:id",
	authMiddleware,
	wishlistIdValidation,
	validate,
	deleteWishlist,
);

export default router;
