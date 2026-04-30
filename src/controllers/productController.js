import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
	/*  #swagger.tags = ['Products']
	*/
	try {
		const products = await Product.find()
			.populate("category")
			.populate("artist");
		res.status(200).json(products)
	}
	catch (error) { next(error); }
};

export const getProductById = async (req, res, next) => {
	/*  #swagger.tags = ['Products']
	*/
	try {
		const { id } = req.params;
		const product = await Product.findById(id)
			.populate("category")
			.populate("artist");
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.status(200).json(product);
	}
	catch (error) { next(error); }
};

export const createProduct = async (req, res, next) => {
	/*  #swagger.tags = ['Products']
	*/
	try {
		const {
			name,
			description,
			notes,
			price,
			stock,
			imageURL,
			images,
			artist,
			category,
		} = req.body;
		const newProduct = await Product.create({
			name,
			description,
			notes,
			price,
			stock,
			imageURL,
			images,
			artist,
			category,
		});

		await newProduct.populate("artist");
		await newProduct.populate("category");

		res.status(201).json(newProduct);
	}
	catch (error) { next(error); }
};

export const updateProduct = async (req, res, next) => {
	/*  #swagger.tags = ['Products']
	*/
	try {
		const { id } = req.params;

		const editableFields = ['name', 'description', 'notes', 'price', 'stock', 'imageURL', 'images', 'artist', 'category'];
		const publicFields = ['_id', 'name', 'description', 'notes', 'price', 'stock', 'imageURL', 'images', 'artist', 'category'];

		const product = await Product.findById(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		editableFields.forEach((field) => {
			let value = req.body[field];

			if (typeof value === 'string') value = value.trim();
			if (value || value === 0) {
				product[field] = value;
			}
		});

		await product.save();

		await product.populate("artist");
		await product.populate("category");

		const responseData = {};
		publicFields.forEach(field => {
			responseData[field] = product[field];
		});

		res.status(200).json(responseData);
	}
	catch (error) { next(error); }
};
export const deleteProduct = async (req, res, next) => {
	/*  #swagger.tags = ['Products']
	*/
	try {
		const { id } = req.params;
		const productToDelete = await Product.findByIdAndDelete(id);
		if (!productToDelete) {
			return res.status(404).json({ message: "Product not found" });
		}
		await Product.findByIdAndDelete(id);

		res.status(204).send();
	}
	catch (error) { next(error); }
};

// api/products/search?q=iPhone&category=Apple&artist=Babymetal&minPrice=5000&maxPrice=20000&inStock=true&sort=name&order=asc&page=2&limit=5
export const searchProducts = async (req, res, next) => {
	/*  #swagger.tags = ['Products']
	*/
	try {
		const {
			q,
			category,
			artist,
			minPrice,
			maxPrice,
			inStock,
			sort,
			order,
			page = 1,
			limit = 10,
		} = req.query;

		let filters = {};
		if (q) {
			filters.searchIndex = { $regex: q, $options: "i" };
		}
		if (category) filters.category = category;
		if (artist) filters.artist = artist;

		if (minPrice || maxPrice) {
			filters.price = {};
			if (minPrice) filters.price.$gte = parseFloat(minPrice);
			if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
		}

		if (inStock === "true") filters.stock = { $gt: 0 };
		else if (inStock === "false") filters.stock = { $lte: 0 };

		let sortOptions = {};

		if (sort) {
			const sortOrder = order === "desc" ? -1 : 1;
			sortOptions[sort] = sortOrder;
		} else {
			sortOptions.createdAt = -1;
		}

		const skip = (parseInt(page) - 1) * parseInt(limit);

		const products = await Product.find(filters)
			.populate("category")
			.populate("artist")
			.sort(sortOptions)
			.skip(skip)
			.limit(parseInt(limit));

		const totalProducts = await Product.countDocuments(filters);
		const totalPages = Math.ceil(totalProducts / parseInt(limit));

		res.json({
			products,
			pagination: {
				currentPage: parseInt(page),
				totalPages,
				totalResults: totalProducts,
				hasNext: parseInt(page) < totalPages,
				hasPrev: parseInt(page) > 1,
			},
		});
	}
	catch (error) { next(error); }
};
