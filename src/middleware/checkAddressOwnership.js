import Address from "../models/Address.js";

const checkAddressOwnershipById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const userId = req.user.userId;
		const isAdmin = req.user.role === "admin";

		// Admins can access any address
		if (isAdmin) {
			return next();
		}

		// Regular users can only access their own addresses
		const address = await Address.findById(id);

		if (!address) {
			return res.status(404).json({ message: "Address not found" });
		}

		if (address.user.toString() !== userId) {
			return res.status(403).json({ 
				message: "Forbidden: You can only access your own addresses" 
			});
		}

		next();
	} catch (error) {
		next(error);
	}
};

export { checkAddressOwnershipById };
