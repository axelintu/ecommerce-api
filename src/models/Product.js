import mongoose from "mongoose";

const featuresObjectSchema = new mongoose.Schema({
	type: {
		type: String,
		trim: true
	},
	data: {
		type: Map,
		of: String,
		default: {}
	}
}, { _id: false });

const featuresArraySchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["p", "li", "div"],
		trim: true
	},
	data: {
		type: [String],
		default: []
	}
}, { _id: false });

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	descriptionObject: featuresObjectSchema,
	descriptionArray: featuresArraySchema,
	featuresObjet: featuresObjectSchema,
	featuresArray: featuresArraySchema,
	notes: [
		{
			class: {
				type: String,
				trim: true
			},
			data: {
				type: String,
				trim: true
			},
		}
	],
	price: {
		type: Number, required: true
	},
	stock: {
		type: Number, default: 0
	},
	imageURL: {
		type: String,
		default: "https://placehold.co/600x400",
		trim: true
	},
	images: [{
		type: String,
		trim: true,
		default: []
	}],
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category"
	},
	artist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Artist",
	},
}, {
	timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
