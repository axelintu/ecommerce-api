import { body, param } from "express-validator";
const artistIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Artist ID must be a valid MongoDB ObjectId"),
];

const createArtistValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("parentArtist")
		.optional()
		.isMongoId()
		.withMessage("Parent artist must be a valid MongoDB ObjectId"),
];

const updateArtistValidation = [
	param("id")
		.isMongoId()
		.withMessage("Artist ID must be a valid MongoDB ObjectId"),
	body("name").optional().notEmpty().withMessage("Name cannot be empty"),
	body("description")
		.optional()
		.notEmpty()
		.withMessage("Description cannot be empty"),
	body("parentArtist")
		.optional()
		.isMongoId()
		.withMessage("Parent artist must be a valid MongoDB ObjectId"),
];
export {
	artistIdValidation,
	createArtistValidation,
	updateArtistValidation,
};
