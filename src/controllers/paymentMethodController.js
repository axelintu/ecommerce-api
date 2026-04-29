import PaymentMethod from "../models/PaymentMethod.js";

export const getUserPaymentMethods = async (req, res, next) => {
	/*  #swagger.tags = ['PaymentMethods']
	*/
	try {
		const userId = req.user.userId;

		const paymentMethods = await PaymentMethod.find({ user: userId }).sort({
			isDefault: -1,
			_id: -1,
		})
		.populate("user", "-password -__v -updatedAt -createdAt");
		res.status(200).json(paymentMethods)
	}
	catch (error) { next(error); }
};

export const getPaymentMethodById = async (req, res, next) => {
	/*  #swagger.tags = ['PaymentMethods']
	*/
	try {
		const { id } = req.params;
		const paymentMethod = await PaymentMethod.findById(id)
			.populate("user", "-password -__v -updatedAt -createdAt");
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
	/*  #swagger.tags = ['PaymentMethods']
	*/
	try {
		const {
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
		const user = req.user.userId;

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
		await newPaymentMethod
			.populate("user", "-password -__v -updatedAt -createdAt");
		const returnedPM = {};
		returnedPM._id           = newPaymentMethod._id;
		returnedPM.user          = newPaymentMethod.user;
		returnedPM.type          = newPaymentMethod.type;
		returnedPM.cardNumber    = newPaymentMethod.cardNumber;
		returnedPM.expiryDate    = newPaymentMethod.expiryDate;
		returnedPM.bank          = newPaymentMethod.bank;
		returnedPM.accountNumber = newPaymentMethod.accountNumber;
		returnedPM.isDefault     = newPaymentMethod.isDefault;
		res.status(201).json(returnedPM);
	}
	catch (error) { next(error); }
};

export const updatePaymentMethod = async (req, res, next) => {
	/*  #swagger.tags = ['PaymentMethods']
	*/
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
		).populate("user", "-password -__v -updatedAt -createdAt");
		const returnedPM = {};
		returnedPM._id           = updatedPaymentMethod._id;
		returnedPM.user          = updatedPaymentMethod.user;
		returnedPM.type          = updatedPaymentMethod.type;
		returnedPM.cardNumber    = updatedPaymentMethod.cardNumber;
		returnedPM.cardHolderName= updatedPaymentMethod.cardHolderName;
		returnedPM.expiryDate    = updatedPaymentMethod.expiryDate;
		returnedPM.bank          = updatedPaymentMethod.bank;
		returnedPM.accountNumber = updatedPaymentMethod.accountNumber;
		returnedPM.isDefault     = updatedPaymentMethod.isDefault;

		res.status(200).json(returnedPM);
	}
	catch (error) { next(error); }
};

export const deletePaymentMethod = async (req, res, next) => {
	/*  #swagger.tags = ['PaymentMethods']
	*/
	try {
		const { id } = req.params;
		const paymentMethodToDelete = await PaymentMethod.findOne({_id: id});
		if (!paymentMethodToDelete) {
			return res.status(404).json({ message: "PaymentMethod not found" });
		}
		await PaymentMethod.findByIdAndDelete(id);
		res.status(204).send();
	}
	catch (error) { next(error); }
};
