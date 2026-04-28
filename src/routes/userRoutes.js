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
	"/",
	authMiddleware,
	isAdmin,
	getUsers
);

router.get(
	"/:id",
	authMiddleware,
	isAdmin,
	userIdValidation,
	validate,
	getUserById,
);

router.post(
	"/",
	authMiddleware,
	isAdmin,
	createUserValidation,
	validate,
	createUser,
);

router.put(
	"/:id",
	authMiddleware,
	isAdmin,
	[...userIdValidation, ...updateUserValidation],
	validate,
	updateUser,
);

router.delete(
	"/:id",
	authMiddleware,
	isAdmin,
	userIdValidation,
	validate,
	deleteUser,
);

export default router;
