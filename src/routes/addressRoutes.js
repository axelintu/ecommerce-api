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
import checkOwnership from "../middleware/checkOwnershipById.js";
import Address from "../models/Address.js";
const checkAddressOwnership = checkOwnership(Address, "Address");
import {
	addressIdValidation,
	createAddressValidation,
	updateAddressValidation
} from "./routesValidation/addressValidation.js";

const router = express.Router();

router.get(
	"/",
	authMiddleware,
	getUserAddresses
);

router.get(
	"/:id",
	authMiddleware,
	addressIdValidation,
	validate,
	checkAddressOwnership,
	getAddressById
);

router.post(
	"/",
	authMiddleware,
	createAddressValidation,
	validate,
	createAddress,
);

router.put(
	"/:id",
	authMiddleware,
	updateAddressValidation,
	validate,
	checkAddressOwnership,
	updateAddress,
);

router.delete(
	"/:id",
	addressIdValidation,
	authMiddleware,
	validate,
	checkAddressOwnership,
	deleteAddress,
);

export default router;
