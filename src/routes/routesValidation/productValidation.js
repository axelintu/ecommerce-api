import { body, param } from "express-validator";

const productIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Product ID must be a valid MongoDB ObjectId"),
];

const createProductValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("price")
		.notEmpty()
		.withMessage("Price is required")
		.isFloat({ min: 0 })
		.withMessage("Price must be a positive number"),
	body("category")
		.optional()
		.isMongoId()
		.withMessage("Category must be a valid MongoDB ObjectId"),
];

const updateProductValidation = [
	body("name").optional().notEmpty().withMessage("Name cannot be empty"),
	body("price")
		.optional()
		.isFloat({ min: 0 })
		.withMessage("Price must be a positive number"),
	body("stock")
		.optional()
		.isInt({ min: 0 })
		.withMessage("Stock must be a non-negative integer"),
	body("category")
		.optional()
		.isMongoId()
		.withMessage("Category must be a valid MongoDB ObjectId"),
];

export {
	productIdValidation,
	createProductValidation,
	updateProductValidation
};
