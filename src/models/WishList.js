import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({

}, {
	timestamps: true
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
