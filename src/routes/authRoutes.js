import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController.js";
import validate from "../middleware/validation.js";

const router = express.Router();

const registerValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("email").isEmail().withMessage("A valid email is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
];
const loginValidation = [
	body("email").isEmail().withMessage("A valid email is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
];

router.post(
	/*  #swagger.tags = ['Authentication']
	*/
	"/register",
	registerValidation,
	validate,
	register
);
router.post(
	/*  #swagger.tags = ['Authentication']
	*/
	"/login",
	loginValidation,
	validate,
	login
);

export default router;
