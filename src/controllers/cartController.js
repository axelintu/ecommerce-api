import Cart from "../models/Cart.js";

export const getCarts = async (req, res, next) => {
	/*  #swagger.tags = ['Cart']
	*/
	try {
		const carts = await Cart.find()
			.populate("user", "-password -__v -updatedAt -createdAt")
			.populate("products.product");
		res.status(200).json(carts);
	}
	catch (error) { next(error); }
};

export const getCartById = async (req, res, next) => {
	/*  #swagger.tags = ['Cart']
	*/
	try {
		const { id } = req.params;
		const cart = await Cart.findById(id);
		if (!cart) {
			return res
				.status(404)
				.json({ message: "Cart not found" });
		}
		res.status(200).json(cart);
	} catch (error) { next(error); }
};

export const getCartByUser = async (req, res, next) => {
	/*  #swagger.tags = ['Cart']
	*/
	try {
		const userId = req.params.userId;
		const cart = await Cart.findOne({ user: userId })
			.populate("user", "-password -__v -updatedAt -createdAt")
			.populate("products.product");
		if (!cart) {
			return res
				.status(404)
				.json({ message: "Cart not found for this user " });
		}
		res.status(200).json(cart);
	} catch (error) { next(error); }
};

const validateProducts = (res, user, products) => {
	if (!user || !products || !Array.isArray(products)) {
		return res
			.status(404)
			.json({ error: "User and products array is required" });
	}

	for (let i = 0; i < products.length; i++) {
		if (
			!products[i].product ||
			!products[i].quantity ||
			products[i].quantity < 1
		) {
			return res.status(400).json({
				error: "Each product must have product ID and quantity >= 1"
			});
		}
	}
}

export const createCart = async (req, res, next) => {
	/*  #swagger.tags = ['Cart']
	*/
	try {
		const { user, products } = req.body;

		validateProducts(res, user, products);

		const newCart = await Cart.create({
			user,
			products
		});
		await newCart.populate("user", "-password -__v -updatedAt -createdAt");
		await newCart.populate("products.product");

		res.status(201).json(newCart);
	} catch (error) { next(error); }
};

export const updateCart = async (req, res, next) => {
	/*  #swagger.tags = ['Cart']
	*/
	try {
		const { id } = req.params;
		const { userId, products } = req.body;

		validateProducts(res, user, products);

		const updatedCart = await Cart.findByIdAndUpdate(
			id,
			{ user, products },
			{ new: true }
		)
			.populate("user", "-password -__v -updatedAt -createdAt")
			.pouplate("products.product");

		if (!updatedCart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		res.status(200).json(updatedCart);
	} catch (error) { next(error); }
};

export const addProductToCart = async (req, res, next) => {
	/*  #swagger.tags = ['Cart']
	*/
	try {
		const { userId, productId, quantity = 1 } = req.body;
		const cart = await Cart.findOne({ user: userId });
		// check if const or let in testing
		if (!cart) {
			cart = new Cart({
				user: userId,
				products: [{ product: productId, quantity }]
			});
		} else {
			const existingProductIndex = cart.products.findIndex(
				(item) => item.product.toString() === productId
			);
			if (existingProductIndex >= 0) {
				cart.products[existingProductIndex].quantity += quantity;
			} else {
				cart.products.push({ product, productId, quantity })
			}
		}

		await cart.save();
		await cart.populate("user", "-password -__v -updatedAt -createdAt");
		await cart.populate("products.productId");

		res.json(cart);
	}
	catch (error) { next(error); }
};


export const deleteCart = async (req, res, next) => {
	/*  #swagger.tags = ['Cart']
	*/
	try {
		const { id } = req.params;
		const cartToDelete = await Cart.findOne({ _id: id });
		if (!cartToDelete) {
			return res.status(404).json({ message: "Cart not found" });
		}
		await Cart.findByIdAndDelete(id);
		res.status(204).send();
	} catch (error) { next(error); }
};
