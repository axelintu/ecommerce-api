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
	"/",
	authMiddleware,
	isAdmin,
	getWishlists
);

router.get(
	"/user/:userId",
	authMiddleware,
	userIdValidation,
	validate,
	getWishlistByUser,
);

router.post(
	"/",
	authMiddleware,
	addProductValidation,
	validate,
	addProductToWishlist,
);

router.delete(
	"/:id/product",
	authMiddleware,
	removeProductValidation,
	validate,
	removeProductFromWishlist,
);

router.delete(
	"/:id",
	authMiddleware,
	wishlistIdValidation,
	validate,
	deleteWishlist,
);

export default router;
