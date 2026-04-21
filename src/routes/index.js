import e from "express";
import authRoutes from "./authRoutes.js";
import addressRoutes from "./addressRoutes.js";
import artistRoutes from "./artistRoutes.js";
import cartRoutes from "./cartRoutes.js"
import categoryRoutes from "./categoryRoutes.js"
import orderRoutes from "./orderRoutes.js"
import productRoutes from "./productRoutes.js"
import paymentMethodRoutes from "./paymentMethodRoutes.js"
import userRoutes from "./userRoutes.js"
import wishlistRoutes from "./wishlistRoutes.js"

const router = e.Router();

router.use("/auth", authRoutes);

router.use("/addresses", addressRoutes);
router.use("/artists", artistRoutes);
router.use("/cart", cartRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);
router.use("/products", productRoutes);
router.use("/payment-methods", paymentMethodRoutes);
router.use("/users", userRoutes);
router.use("/wishlist", wishlistRoutes);

export default router;
