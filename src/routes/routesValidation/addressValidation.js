import { body, param } from "express-validator";

const addressIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Address ID must be a valid MongoDB ObjectId"),
];

const createAddressValidation = [
	body("alias")
		.notEmpty()
		.withMessage("Address is required")
		.trim(),
	body("address")
		.notEmpty()
		.withMessage("Address is required")
		.trim(),
	body("city")
		.notEmpty()
		.withMessage("City is required")
		.trim(),
	body("state")
		.notEmpty()
		.withMessage("State is required")
		.trim(),
	body("postalCode")
		.notEmpty()
		.withMessage("Postal code is required")
		.isLength({ min: 4, max: 6 })
		.withMessage("Postal code must be between 4 and 6 characters")
		.trim(),
	body("country")
		.notEmpty()
		.withMessage("Country is required")
		.trim(),
	body("phone")
		.notEmpty()
		.withMessage("Phone is required")
		.isLength({ max: 10 })
		.withMessage("Phone number must not exceed 10 characters")
		.trim(),
	body("addresType")
		.optional()
		.isIn(["home", "work", "other"])
		.withMessage("Invalid address type"),
	body("isDefault")
		.optional()
		.isBoolean()
		.withMessage("isDefault must be a boolean"),
];

const updateAddressValidation = [
	param("id")
		.isMongoId()
		.withMessage("Address ID must be a valid MongoDB ObjectId"),
	body("alias")
		.notEmpty()
		.withMessage("Address is required")
		.trim(),
	body("address")
		.optional()
		.notEmpty()
		.withMessage("Address cannot be empty")
		.trim(),
	body("city")
		.optional()
		.notEmpty()
		.withMessage("City cannot be empty")
		.trim(),
	body("state")
		.optional()
		.notEmpty()
		.withMessage("State cannot be empty")
		.trim(),
	body("postalCode")
		.optional()
		.isLength({ min: 4, max: 6 })
		.withMessage("Postal code must be between 4 and 6 characters")
		.trim(),
	body("country")
		.optional()
		.notEmpty()
		.withMessage("Country cannot be empty")
		.trim(),
	body("phone")
		.optional()
		.isLength({ max: 10 })
		.withMessage("Phone number must not exceed 10 characters")
		.trim(),
	body("addresType")
		.optional()
		.isIn(["home", "work", "other"])
		.withMessage("Invalid address type"),
	body("isDefault")
		.optional()
		.isBoolean()
		.withMessage("isDefault must be a boolean"),
];

export {
	addressIdValidation,
	createAddressValidation,
	updateAddressValidation
}
