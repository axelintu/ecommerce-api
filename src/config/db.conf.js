import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connection = await mongoose.connect("mongodb://localhost:27017/ecommerce-db-api");
		console.log(`MongoDB connected ${connection.connection.host}`);
	} catch (error) {
		console.error(error, "Error connecting to MongoDB");
		process.exist(1);
	}
};

export default connectDB;
