import e from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.conf.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import logger from "./src/middlewares/logger.js";
import routes from "./src/routes/index.js";
dotenv.config();

const app = e();
const port = process.env.PORT;

app.use(e.json());
app.use(logger);
app.use(errorHandler);

connectDB();

app.get("/api", (req, res) => {
	res.send("API Ecommerce con MongoDB");
});

app.use((req, res) => {
	res.status(404).json({
		error: "Route not found",
		method: req.method,
		url: req.originalUrl,
	});
});

app.use("/api", routes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
