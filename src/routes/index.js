import e from "express";
import artistRoutes from "./artistRoutes.js";

const router = e.Router();

router.use("/artists", artistRoutes);
export default router;
