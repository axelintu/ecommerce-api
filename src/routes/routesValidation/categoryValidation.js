import { body, param } from "express-validator";
const categoryIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Category ID must be a valid MongoDB ObjectId"),
];

const createCategoryValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("parentCategory")
		.optional({ checkFalsy: true })
		.isMongoId()
		.withMessage("Parent category must be a valid MongoDB ObjectId"),
];

const updateCategoryValidation = [
	param("id")
		.isMongoId()
		.withMessage("Category ID must be a valid MongoDB ObjectId"),
	body("name").optional().notEmpty().withMessage("Name cannot be empty"),
	body("description")
		.optional()
		.notEmpty()
		.withMessage("Description cannot be empty"),
	body("parentCategory")
		.optional({ checkFalsy: true })
		.isMongoId()
		.withMessage("Parent category must be a valid MongoDB ObjectId"),
];
export {
	categoryIdValidation,
	createCategoryValidation,
	updateCategoryValidation,
};
