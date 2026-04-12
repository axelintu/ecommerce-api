import "dotenv/config";
import e from "express";
import connectDB from "./src/config/db.conf.js";
import routes from "./src/routes/index.js";

const app = e();
const port = process.env.PORT;

app.use(e.json());

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
