import express from "express";
import { body, param } from "express-validator";
import {
	getWishlists,
	getWishlistByUser,
	addProductToWishlist,
	removeProductFromWishlist,
	deleteWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get(
	"/wishlist",
	getWishlists
);

router.get(
	"/wishlist/user/:id",
	getWishlistByUser,
);

router.post(
	"/wishlist",
	addProductToWishlist,
);

router.delete(
	"/wishlist/:id/product",
	removeProductFromWishlist,
);

router.delete(
	"/wishlist/:id",
	deleteWishlist,
);

export default router;
