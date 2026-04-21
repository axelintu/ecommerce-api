import express from "express";
import {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "../controllers/userController.js";
import validate from "../middleware/validation.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
	userIdValidation,
	createUserValidation,
	updateUserValidation
} from "./routesValidation/userValidation.js";

const router = express.Router();

router.get(
	"/users",
	authMiddleware,
	isAdmin,
	getUsers
);

router.get(
	"/users/:id",
	authMiddleware,
	isAdmin,
	userIdValidation,
	validate,
	getUserById,
);

router.post(
	"/users",
	authMiddleware,
	isAdmin,
	createUserValidation,
	validate,
	createUser,
);

router.put(
	"/users/:id",
	authMiddleware,
	isAdmin,
	[...userIdValidation, ...updateUserValidation],
	validate,
	updateUser,
);

router.delete(
	"/users/:id",
	userIdValidation,
	validate,
	authMiddleware,
	isAdmin,
	deleteUser,
);

export default router;
