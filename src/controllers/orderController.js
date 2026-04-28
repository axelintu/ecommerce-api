import Order from "../models/Order.js";

export const getOrders = async (req, res, next) => {
	/*  #swagger.tags = ['Orders']
	*/
	try {
		const orders = await Order.find()
			.populate("user", "-password -__v -updatedAt -createdAt")
			.populate("products.productId")
			.populate("paymentMethod")
			.populate("address");
		res.status(200).json(orders)
	}
	catch (error) { next(error); }
};

export const getOrderById = async (req, res, next) => {
	/*  #swagger.tags = ['Orders']
	*/
	try {
		const { id } = req.params;
		const order = await Order.findById(id)
			.populate("user", "-password -__v -updatedAt -createdAt")
			.populate("products.productId")
			.populate("paymentMethod")
			.populate("address");
		;
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.status(200).json(order);
	}
	catch (error) { next(error); }
};

export const createOrder = async (req, res, next) => {
	/*  #swagger.tags = ['Orders']
	*/
	try {
		const {
			user,
			products,
			address,
			paymentMethod,
			shippingCost,
			totalPrice
		} = req.body;

		const newOrder = await Order.create({
			user,
			products,
			address,
			paymentMethod,
			shippingCost,
			totalPrice
		});
		await newOrder.populate("user", "-password -__v -updatedAt -createdAt");
		await newOrder.populate("products.productId");

		res.status(201).json(newOrder);
	}
	catch (error) { next(error); }
};
export const updateOrderStatus = async (req, res, next) => {
	/*  #swagger.tags = ['Orders']
	*/
	try {
		const { id } = req.params;
		const { status, paymentStatus } = req.body;
		const updatedOrder = await Order.findByIdAndUpdate(
			id,
			{ status, paymentStatus },
			{ new: true }
		);

		if (!updatedOrder) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.status(200).json(updatedOrder);
	}
	catch (error) { next(error); }
};
