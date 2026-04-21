import express from "express";
import {
	getArtists,
	getArtistById,
	createArtist,
	updateArtist,
	deleteArtist
} from "../controllers/artistController.js";
import validate from "../middleware/validation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";
import {
	artistIdValidation,
	createArtistValidation,
	updateArtistValidation
} from "./routesValidation/artistValidation.js";

const router = express.Router();

router.get(
	"/",
	getArtists
);

router.get(
	"/:id",
	artistIdValidation,
	validate,
	getArtistById
);

router.post(
	"/",
	authMiddleware,
	isAdmin,
	createArtistValidation,
	validate,
	createArtist
);

router.put(
	"/:id",
	authMiddleware,
	isAdmin,
	updateArtistValidation,
	validate,
	updateArtist
);

router.delete(
	"/:id",
	authMiddleware,
	isAdmin,
	artistIdValidation,
	validate,
	deleteArtist
);

export default router;
