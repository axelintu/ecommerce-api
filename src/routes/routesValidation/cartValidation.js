import { body, param } from "express-validator";

const cartIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Cart ID must be a valid MongoDB ObjectId"),
];

const userIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("User ID must be a valid MongoDB ObjectId"),
];

const createCartValidation = [
	body("products")
		.optional()
		.isArray()
		.withMessage("Products must be an array"),
	body("products.*.product")
		.isMongoId()
		.withMessage("Each product must be a valid MongoDB ObjectId"),
	body("products.*.quantity")
		.isInt({ min: 1 })
		.withMessage("Quantity must be an integer greater than or equal to 1"),
];

const putCartValidation = [
	param("id")
		.isMongoId()
		.withMessage("Cart ID must be a valid MongoDB ObjectId"),
	body("products")
		.notEmpty()
		.withMessage("Products array is required")
		.isArray()
		.withMessage("Products must be an array"),
	body("products.*.product")
		.notEmpty()
		.withMessage("Each product item must include product ID")
		.isMongoId()
		.withMessage("Each product must be a valid MongoDB ObjectId"),
	body("products.*.quantity")
		.notEmpty()
		.withMessage("Each product item must include quantity")
		.isInt({ min: 1 })
		.withMessage("Quantity must be an integer greater than or equal to 1"),
];

const addToCartValidation = [
	param("id")
		.isMongoId()
		.withMessage("Cart ID must be a valid MongoDB ObjectId"),
	body("productId")
		.notEmpty()
		.withMessage("ProductId must be a valid MongoDB ObjectId"),
	body("quantity")
		.optional()
		.notEmpty()
		.isInt({ min: 1 })
		.withMessage("Quantity must be an integer greater than or equal to 1")
];

const removeFromCartValidation = [
	param("id")
		.isMongoId()
		.withMessage("Cart ID must be a valid MongoDB ObjectId"),
	body("productId")
		.notEmpty()
		.withMessage("ProductId must be a valid MongoDB ObjectId")
];

export {
	cartIdValidation,
	userIdValidation,
	createCartValidation,
	putCartValidation,
	addToCartValidation,
	removeFromCartValidation
};
