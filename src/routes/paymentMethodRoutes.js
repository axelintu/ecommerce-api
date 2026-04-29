import express from "express";
import {
	getUserPaymentMethods,
	getPaymentMethodById,
	createPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
} from "../controllers/paymentMethodController.js";
import validate from "../middleware/validation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import checkOwnership from "../middleware/checkOwnershipById.js";
import PaymentMethod from "../models/PaymentMethod.js";
const checkPMOwnership = checkOwnership(PaymentMethod, "Payment method");
import {
	paymentIdValidation,
	createPaymentValidation,
	updatePaymentValidation
} from "./routesValidation/paymentMethodValidation.js";

const router = express.Router();

router.get(
	"/",
	authMiddleware,
	getUserPaymentMethods
);

router.get(
	"/:id",
	authMiddleware,
	paymentIdValidation,
	validate,
	checkPMOwnership,
	getPaymentMethodById,
);

router.post(
	"/",
	authMiddleware,
	createPaymentValidation,
	validate,
	createPaymentMethod,
);

router.put(
	"/:id",
	authMiddleware,
	updatePaymentValidation,
	validate,
	checkPMOwnership,
	updatePaymentMethod,
);

router.delete(
	"/:id",
	authMiddleware,
	paymentIdValidation,
	validate,
	checkPMOwnership,
	deletePaymentMethod,
);

export default router;
