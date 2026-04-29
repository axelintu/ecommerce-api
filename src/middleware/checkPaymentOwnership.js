import PaymentMethod from "../models/PaymentMethod.js";

const checkPaymentOwnershipById = async (req, res, next) => {
try {
	const { id } = req.params;
	const userId = req.user.userId;
	const isAdmin = req.user.role === "admin";

	// Admins can access any paymentMethod
	if (isAdmin) {
		return next();
	}

	// Regular users can only access their own paymentMethods
	const paymentMethod = await PaymentMethod.findById(id);

	if (!paymentMethod) {
		return res.status(404).json({ message: "PaymentMethod not found" });
	}

	if (paymentMethod.user.toString() !== userId) {
		return res.status(403).json({ 
			message: "Forbidden: You can only access your own paymentMethods" 
		});
	}

	next();
} catch (error) { next(error) }
};

export default checkPaymentOwnershipById;
