import PaymentMethod from "../models/PaymentMethod.js";

export const getPaymentMethods = async (req, res, next) => {
	try {
		const paymentMethods = await PaymentMethod.find()
			.populate("user");
		res.status(200).json(paymentMethods)
	}
	catch (error) { next(error); }
};

export const getPaymentMethodById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const paymentMethod = await PaymentMethod.findById(id)
			.populate("user");
		if (!paymentMethod) {
			return res
				.status(404)
				.json({ message: "PaymentMethod not found" });
		}
		res.status(200).json(paymentMethod);
	}
	catch (error) { next(error); }
};

export const createPaymentMethod = async (req, res, next) => {
	try {
		const {
			user,
			type,
			cardNumber,
			cardHolderName,
			expiryDate,
			paypalEmail,
			bankName,
			accountNumber,
			isDefault,
			cvv,
		} = req.body;

		if (isDefault) {
			await PaymentMethod.updateMany({ user }, { isDefault: false });
		}

		const newPaymentMethod = await PaymentMethod.create({
			user,
			type,
			cardNumber,
			cardHolderName,
			expiryDate,
			paypalEmail,
			bankName,
			accountNumber,
			isDefault: isDefault || false,
			cvv,
		});
		await newPaymentMethod.populate("user");
		res.status(201).json(newPaymentMethod);
	}
	catch (error) { next(error); }
};

export const updatePaymentMethod = async (req, res, next) => {
	try {
		const { id } = req.params;
		const {
			user,
			type,
			cardNumber,
			cardHolderName,
			expiryDate,
			paypalEmail,
			bankName,
			accountNumber,
			isDefault,
			cvv,
		} = req.body;

		const existingPaymentMethod = await PaymentMethod.findById(id);
		if (!existingPaymentMethod) {
			return res
				.status(404)
				.json({ message: "Payment method not found" });
		}

		const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
			id,
			{
				user,
				type,
				cardNumber,
				cardHolderName,
				expiryDate,
				paypalEmail,
				bankName,
				accountNumber,
				isDefault,
				cvv,
			},
			{ new: true }
		).populate("user");
		res.status(200).json(updatedPaymentMethod);
	}
	catch (error) { next(error); }
};

export const deletePaymentMethod = async (req, res, next) => {
	try {
		const { id } = req.params;
		const paymentMethodToDelete = await PaymentMethod.findOne(id);
		if (!paymentMethodToDelete) {
			return res.status(404).json({ message: "PaymentMethod not found" });
		}
		await PaymentMethod.findByIdAndDelete(id);
		res.status(204).send();
	}
	catch (error) { next(error); }
};
