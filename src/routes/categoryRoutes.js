import express from "express";
import {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
} from "../controllers/categoryController.js";
import validate from "../middleware/validation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import {
	categoryIdValidation,
	createCategoryValidation,
	updateCategoryValidation
} from "./routesValidation/categoryValidation.js";

const router = express.Router();

router.get(
	"/categories",
	getCategories
);

router.get(
	"/categories/:id",
	categoryIdValidation,
	validate,
	getCategoryById
);

router.post(
	"/categories",
	authMiddleware,
	isAdmin,
	createCategoryValidation,
	validate,
	createCategory,
);

router.put(
	"/categories/:id",
	authMiddleware,
	isAdmin,
	updateCategoryValidation,
	validate,
	updateCategory,
);

router.delete(
	"/categories/:id",
	authMiddleware,
	isAdmin,
	categoryIdValidation,
	validate,
	deleteCategory,
);

export default router;
