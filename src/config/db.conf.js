import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const dbConnection = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce-db-dev");
		console.log(`MongoDB connected ${dbConnection.connection.host}`);
	} catch (error) {
		console.error(error, "Error connecting to MongoDB");
		process.exit(1);
	}
};

export default connectDB;
