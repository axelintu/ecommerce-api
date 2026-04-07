import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
	urlName: {
		type: String,
		required: true,
		unique: true,
		index: true,
		trim: true,
		lowercase: true,
	},
	name: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true
	},
}, {
	timestamps: true
});

const Artist = mongoose.model("Artist", artistSchema);
export default Artist;
