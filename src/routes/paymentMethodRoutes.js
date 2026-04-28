import express from "express";
import {
	getPaymentMethods,
	getPaymentMethodById,
	createPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
} from "../controllers/paymentMethodController.js";
import validate from "../middleware/validation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import {
	paymentIdValidation,
	createPaymentValidation,
	updatePaymentValidation
} from "./routesValidation/paymentMethodValidation.js";

const router = express.Router();

router.get(
	"/",
	authMiddleware,
	getPaymentMethods
);

router.get(
	"/:id",
	authMiddleware,
	paymentIdValidation,
	validate,
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
	updatePaymentMethod,
);

router.delete(
	"/:id",
	authMiddleware,
	paymentIdValidation,
	validate,
	deletePaymentMethod,
);

export default router;
