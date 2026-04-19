import Category from "../models/Category.js";

export const getCategories = async (req, res, next) => {
	try {
		const categories = await Category.find().populate("parentCategory");
		res.status(200).json(categories)
	}
	catch (error) { next(error); }
};

export const getCategoryById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const category = await Category.findById(id).populate("parentCategory");
		if (!category) {
			return res.status(404).json({ message: "Category not found " });
		}
		res.status(200).json(category);
	}
	catch (error) { next(error); }
};

export const createCategory = async (req, res, next) => {
	try {
		const {
			urlName,
			name,
			description,
			imageURL,
			backgroundImageURL,
			parentCategory
		} = req.body;
		const newCategory = await Category.create({
			urlName,
			name,
			description,
			imageURL,
			backgroundImageURL,
			parentCategory: parentCategory || null
		});
		await newCategory.populate("parentCategory");
		res.status(201).json(newCategory);
	}
	catch (error) { next(error); }
};

export const updateCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		const {
			urlName,
			name,
			description,
			imageURL,
			backgroundImageURL,
			parentCategory
		} = req.body;
		const updatedCategory = await Category.findByIdAndUpdate(
			id,
			{
				urlName,
				name,
				description,
				imageURL,
				backgroundImageURL,
				parentCategory: parentCategory || null,
			},
			{ new: true },
		).populate("parentCategory");
		if (!updatedCategory) {
			return res.status(404).json({ message: "Category not found" });
		}
		res.status(200).json(updatedCategory);
	}
	catch (error) { next(error); }
};

export const deleteCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		const category = await Category.findOne(id);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}
		await Category.findByIdAndDelete(id);
		res.status(204).send();
	}
	catch (error) { next(error); }
};
