import { body, param } from "express-validator";

const wishlistIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Wishlist ID must be a valid MongoDB ObjectId"),
];

const userIdValidation = [
	param("userId")
		.isMongoId()
		.withMessage("Wishlist User ID must be a valid MongoDB ObjectId"),
];

const addProductValidation = [
	body("userId")
		.isMongoId()
		.withMessage("User ID must be a valid MongoDB ObjectId"),
	body("productId")
		.isMongoId()
		.withMessage("Product ID must be a valid MongoDB ObjectId"),
];

const removeProductValidation = [
	param("id")
		.isMongoId()
		.withMessage("Wishlist ID must be a valid MongoDB ObjectId"),
	body("productId")
		.isMongoId()
		.withMessage("Product ID must be a valid MongoDB ObjectId"),
];

export {
	wishlistIdValidation,
	userIdValidation,
	addProductValidation,
	removeProductValidation,
};
