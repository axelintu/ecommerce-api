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
	"/",
	getCategories
);

router.get(
	"/:id",
	categoryIdValidation,
	validate,
	getCategoryById
);

router.post(
	"/",
	authMiddleware,
	isAdmin,
	createCategoryValidation,
	validate,
	createCategory,
);

router.put(
	"/:id",
	authMiddleware,
	isAdmin,
	updateCategoryValidation,
	validate,
	updateCategory,
);

router.delete(
	"/:id",
	authMiddleware,
	isAdmin,
	categoryIdValidation,
	validate,
	deleteCategory,
);

export default router;
