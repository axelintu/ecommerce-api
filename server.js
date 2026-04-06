import "dotenv/config";
import e from "express";
import connectDB from "./src/config/db.conf.js";
import routes from "./src/routes/index.js";

const app = e();

app.use(e.json());

connectDB();

app.use("/api", routes);
const port = process.env.PORT;
console.log(`${port}`);
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
