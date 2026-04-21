import express from "express";
import {
	searchProducts,
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController.js";
import validate from "../middleware/validation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import {
	productIdValidation,
	createProductValidation,
	updateProductValidation
} from "./routesValidation/productValidation.js";

const router = express.Router();

router.get(
	"/search",
	searchProducts
);

router.get(
	"/",
	getProducts
);

router.get(
	"/:id",
	productIdValidation,
	validate,
	getProductById
);

router.post(
	"/",
	authMiddleware,
	isAdmin,
	createProductValidation,
	validate,
	createProduct,
);

router.put(
	"/:id",
	authMiddleware,
	isAdmin,
	[...productIdValidation, ...updateProductValidation],
	validate,
	updateProduct,
);

router.delete(
	"/:id",
	authMiddleware,
	isAdmin,
	productIdValidation,
	validate,
	deleteProduct,
);

export default router;
