import mongoose, { Mongoose } from "mongoose";

const categorySchema = new mongoose.Schema({
	urlName: {
		type: String,
		unique: true,
		index: true,
		trim: true,
		lowercase: true,
		required: true,
	},
	name: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true,
		required: true,
	},
	imageURL: {
		type: String,
		required: false,
		default: null
	},
	backgroundImageURL: {
		type: String,
		required: false,
		default: null
	},
	parentCategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		default: null
	},
}, {
	timestamps: true
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
