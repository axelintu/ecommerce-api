import e from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.conf.js";
import errorHandler from "./src/middleware/errorHandler.js";
import logger from "./src/middleware/logger.js";
import routes from "./src/routes/index.js";
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

// Read the generated JSON file
const swaggerFile = JSON.parse(
	await readFile(new URL('./swagger-output.json', import.meta.url))
);

const app = e();
const port = process.env.PORT;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(e.json());
app.use(logger);

connectDB();

app.get("/api", (req, res) => {
	res.send("API Ecommerce con MongoDB. \n Documentation available at /api-docs");
});

app.use("/api", routes);

app.use(errorHandler);

app.use((req, res) => {
	res.status(404).json({
		error: "Route not found",
		method: req.method,
		url: req.originalUrl,
	});
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
