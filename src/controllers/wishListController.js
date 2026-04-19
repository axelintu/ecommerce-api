import Wishlist from "../models/Wishlist";
export const getWishlists = async (req, res, next) => {
	try {
		const wishlists = await Wishlist.find()
			.populate("user")
			.populate("products");
		res.status(200).json(wishlists)
	}
	catch (error) { next(error); }
};

export const getWishlistByUser = async (req, res, next) => {
	try {
		// const userId = req.userId;
		const userId = req.body.userId;
		const wishlist = await Wishlist.findById({ user: id });
		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found " });
		}
		res.status(200).json(wishlist);
	}
	catch (error) { next(error); }
};

export const addProductToWishlist = async (req, res, next) => {
	try {
		const { userId, productId } = req.body;
		let wishlist = await WishList.findOne({ user: userId });

		if (!wishlist) {
			wishlist = new WishList({ user: userId, products: [productId] });
		} else {
			const alreadyAdded = wishlist.products.some(
				(p) => p.toString() === productId,
			);
			if (alreadyAdded) {
				return res
					.status(200)
					.json({ message: "Product already in wishlist", wishlist });
			}
			wishlist.products.push(productId);
		}

		await wishlist.save();
		await wishlist.populate("user");
		await wishlist.populate("products");
		res.status(200).json(wishlist);
	}
	catch (error) { next(error); }
};

export const removeProductFromWishlist = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { productId } = req.body;
		const wishlist = await WishList.findById(id);
		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found" });
		}
		wishlist.products = wishlist.products.filter(
			(p) => p.toString() !== productId,
		);
		await wishlist.save();
		await wishlist.populate("user");
		await wishlist.populate("products");
		res.status(200).json(wishlist);
	} catch (error) {
		next(error);
	}
};

export const deleteWishlist = async (req, res, next) => {
	try {
		const { id } = req.params;
		const wishlistToDelete = await Wishlist.findOne(id);
		if (!wishlistToDelete) {
			return res.status(404).json({ message: "Wishlist not found" });
		}
		await Wishlist.findByIdAndDelete(id);
		res.status(204).send();
	}
	catch (error) { next(error); }
};
