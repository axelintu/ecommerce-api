import { body, param } from "express-validator";

const productIdValidation = [
	param("id")
		.isMongoId()
		.withMessage("Product ID must be a valid MongoDB ObjectId"),
];

const descriptionItemValidation = body("description")
	.optional()
	.isArray()
	.withMessage("Description must be an array")
	.custom((arr) => {
		if (!Array.isArray(arr)) return false;

		return arr.every((item) => {
			if (!item || typeof item !== "object" || Array.isArray(item))
				return false;

			if (
				!["p", "ul", "ol", "h2", "h3"].includes(
					item.tag,
				)
			) {
				return false;
			}

			if (
				!["info", "warning", "success", "highlight"].includes(
					item.class,
				)
			) {
				return false;
			}

			if (!["normal", "key-value-pair"].includes(item.type)) {
				return false;
			}

			if (item.type === "normal") {
				return (
					Array.isArray(item.data) &&
					item.data.length > 0 &&
					item.data.every((value) => typeof value === "string")
				);
			}

			if (item.type === "key-value-pair") {
				return (
					item.data &&
					typeof item.data === "object" &&
					!Array.isArray(item.data) &&
					Object.keys(item.data).length > 0 &&
					Object.values(item.data).every(
						(value) => typeof value === "string",
					)
				);
			}

			return false;
		});
	})
	.withMessage(
		"Invalid description format. 'normal' must use an array of strings; 'key-value-pair' must use an object with string values",
	);

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
		descriptionItemValidation,
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
		descriptionItemValidation,
];

export {
	productIdValidation,
	createProductValidation,
	updateProductValidation
};
