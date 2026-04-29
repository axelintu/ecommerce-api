import { body, param } from "express-validator";
const artistIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Artist ID must be a valid MongoDB ObjectId"),
];

const createArtistValidation = [
	body("urlName")
		.notEmpty()
		.withMessage("urlName is required"),
	body("name")
		.notEmpty()
		.withMessage("Name is required")
	,
	body("description")
		.notEmpty()
		.withMessage("Description is required"),
	body("imageUrl")
		.optional({ checkFalsy: true })
		.notEmpty()
		.withMessage("imageUrl is required"),
	body("backgroundImageUrl")
		.optional({ checkFalsy: true })
		.notEmpty()
		.withMessage("backgroundImageUrl is required")
];

const updateArtistValidation = [
	param("id")
		.isMongoId()
		.withMessage("Artist ID must be a valid MongoDB ObjectId"),
	body("urlName")
		.notEmpty()
		.withMessage("urlName cannot be empty"),
	body("name")
		.optional()
		.notEmpty()
		.withMessage("Name cannot be empty"),
	body("description")
		.optional()
		.notEmpty()
		.withMessage("Description cannot be empty"),
	body("imageUrl")
		.optional({ checkFalsy: true })
		.notEmpty()
		.withMessage("Description cannot be empty"),
	body("backgroundImageUrl")
		.optional({ checkFalsy: true })
		.notEmpty()
		.withMessage("Description cannot be empty")
];
export {
	artistIdValidation,
	createArtistValidation,
	updateArtistValidation,
};
