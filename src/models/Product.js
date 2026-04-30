import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: [{
		tag: {
			type: String,
			enum: ["p", "ul", "ol", "h2", "h3"],
			required: true,
		},
		class: {
			type: String,
			enum: ["info", "warning", "success", "highlight"],
			required: true,
		},
		type: {
			type: String,
			enum: ["normal", "key-value-pair"],
			required: true,
		},
		data: {
			type: mongoose.Schema.Types.Mixed,
			validate: {
				validator: function (v) {
					if (this.type === "normal" && !Array.isArray(v))
						return false;
					if (
						this.type === "key-value-pair" &&
						typeof v !== "object"
					)
						return false;
					return true;
				},
				message:
					"Data must be array for 'normal' type and object for 'key-value-pair' type",
			},
			required: true,
		},
	},
	{ 
		_id: false, 
		timestamps: false,
	}],
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
		type: Number,
		required: true
	},
	stock: {
		type: Number,
		default: 0
	},
	imageURL: {
		type: String,
		default: "/images/placeholders/default-product.png",
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
		required: true
	},
	searchIndex: {
		type: String,
		lowercase: true,
		select: false,
	}
}, {
	timestamps: true
});

productSchema.pre("save", function () {
	let textParts = [this.name];

	// Handle the complex description array
	if (this.description && this.description.length > 0) {
		this.description.forEach((item) => {
			if (item.type === "normal" && Array.isArray(item.data)) {
				textParts.push(...item.data);
			} else if (
				item.type === "key-value-pair" &&
				typeof item.data === "object"
			) {
				textParts.push(...Object.values(item.data));
			}
		});
	}

	if (this.notes && this.notes.length > 0) {
		this.notes.forEach((note) => textParts.push(note.data));
	}

	this.searchIndex = textParts.join(" ");
});

const Product = mongoose.model("Product", productSchema);

export default Product;
