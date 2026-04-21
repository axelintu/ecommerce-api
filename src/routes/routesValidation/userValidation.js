import { body, param } from "express-validator";

const userIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("User ID must be a valid MongoDB ObjectId"),
];

const createUserValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("email").isEmail().withMessage("A valid email is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
	body("role")
		.optional()
		.isIn(["customer", "admin"])
		.withMessage("Role must be customer or admin"),
];

const updateUserValidation = [
	body("email").optional().isEmail().withMessage("A valid email is required"),
	body("role")
		.optional()
		.isIn(["customer", "admin"])
		.withMessage("Role must be customer or admin"),
];

export {
	userIdValidation,
	createUserValidation,
	updateUserValidation
};
