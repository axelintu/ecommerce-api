import { body, param } from "express-validator";

const addressIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Address ID must be a valid MongoDB ObjectId"),
];

const createAddressValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("parentAddress")
		.optional()
		.isMongoId()
		.withMessage("Parent address must be a valid MongoDB ObjectId"),
];

const updateAddressValidation = [
	param("id")
		.isMongoId()
		.withMessage("Address ID must be a valid MongoDB ObjectId"),
	body("name").optional().notEmpty().withMessage("Name cannot be empty"),
	body("description")
		.optional()
		.notEmpty()
		.withMessage("Description cannot be empty"),
	body("parentAddress")
		.optional()
		.isMongoId()
		.withMessage("Parent address must be a valid MongoDB ObjectId"),
];

export {
	addressIdValidation,
	createAddressValidation,
	updateAddressValidation
}
