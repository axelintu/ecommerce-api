import express from "express";
import {
	getUserAddresses,
	getAddressById,
	createAddress,
	updateAddress,
	deleteAddress,
} from "../controllers/addressController.js";
import validate from "../middleware/validation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import {
	addressIdValidation,
	createAddressValidation,
	updateAddressValidation
} from "./routesValidation/addressValidation.js";

const router = express.Router();

router.get(
	"/",
	getUserAddresses
);

router.get(
	"/:id",
	addressIdValidation,
	validate,
	getAddressById
);

router.post(
	"/",
	authMiddleware,
	isAdmin,
	createAddressValidation,
	validate,
	createAddress,
);

router.put(
	"/:id",
	authMiddleware,
	isAdmin,
	updateAddressValidation,
	validate,
	updateAddress,
);

router.delete(
	"/:id",
	authMiddleware,
	isAdmin,
	addressIdValidation,
	validate,
	deleteAddress,
);

export default router;
