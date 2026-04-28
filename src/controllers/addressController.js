import Address from "../models/Address.js";

export const getUserAddresses = async (req, res, next) => {
	/*  #swagger.tags = ['Addresses']
	*/
	try {
		const userId = req.user.userId;

		const addresses = await Address.find({ user: userId }).sort({
			isDefault: -1,
			_id: -1,
		});
		res.status(200).json({ addresses });
	} catch (error) {
		next(error);
	}
};

export const getAddressById = async (req, res, next) => {
	/*  #swagger.tags = ['Addresses']
	*/
	try {
		const { id } = req.params;
		const userId = req.user.userId;

		const address = await Address.findOne({ _id: id, user: userId });
		if (!address) {
			return res.status(404).json({ message: "Address not found" });
		}
		res.status(200).json(address);
	} catch (error) {
		next(error);
	}
};
export const createAddress = async (req, res, next) => {
	/*  #swagger.tags = ['Addresses']
	*/
	try {
		const {
			name,
			address,
			city,
			state,
			postalCode,
			country,
			phone,
			isDefault,
			addressType,
		} = req.body;
		const userId = req.user.userId;

		if (isDefault) {
			await Address.updateMany({ user }, { isDefault: false });
		}

		const newAddress = new Address({
			name,
			address,
			city,
			state,
			postalCode,
			country: country || "México",
			phone,
			isDefault: isDefault || false,
			addressType: addressType || "home",
		});

		await newAddress.save();
		res.status(201).json(newAddress);
	} catch (error) {
		next(error);
	}
};
export const updateAddress = async (req, res, next) => {
	/*  #swagger.tags = ['Addresses']
	*/
	try {
		const addressId = req.params.id;
		const {
			name,
			address,
			city,
			state,
			postalCode,
			country,
			phone,
			isDefault,
			addressType,
		} = req.body;
		const userId = req.user.userId;

		if (!updatedAddress) {
			return res.status(404).json({ message: "Address not found" });
		}

		const updatedAddress = await Address.findOne({
			addressId,
			user: userId,
		});
		if (!updatedAddress) {
			return res.status(404).json({ message: "Address not found" });
		}

		if (isDefault && !updatedAddress.isDefault) {
			await Address.updateMany(
				{ user: userId, _id: { $ne: id } },
				{ isDefault: false },
			);
		}

		shipAddress.name = name;
		shipAddress.address = address;
		shipAddress.city = city;
		shipAddress.state = state;
		shipAddress.postalCode = postalCode;
		shipAddress.country = country || shipAddress.country;
		shipAddress.phone = phone;
		shipAddress.isDefault =
			isDefault !== undefined ? isDefault : shipAddress.isDefault;
		shipAddress.addressType = addressType || shipAddress.addressType;

		await shipAddress.save();

		res.status(200).json(updatedAddress);
	} catch (error) {
		next(error);
	}
};

export const deleteAddress = async (req, res, next) => {
	/*  #swagger.tags = ['Addresses']
	*/
	try {
		const { id } = req.params;
		const userId = req.body.userId;
		const address = await Address.findOne({
			_id: id,
			user: userId
		});

		if (!address) {
			return res.status(404).json({ message: "Address not found" });
		}

		await Address.findByIdAndDelete(id);

		res.status(200).json({
			message: "Address deleted succesfully"
		});
	} catch (error) {
		next(error);
	}
};
