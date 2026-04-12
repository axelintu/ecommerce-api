import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const dbConnection = await mongoose.connect("mongodb://localhost:27017/ecommerce-db-api");
		console.log(`MongoDB connected ${dbConnection.connection.host}`);
	} catch (error) {
		console.error(error, "Error connecting to MongoDB");
		process.exit(1);
	}
};

export default connectDB;
