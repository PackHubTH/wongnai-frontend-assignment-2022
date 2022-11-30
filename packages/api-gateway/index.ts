import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors"

import getRestaurant from "./controllers/getRestaurant";
import getShortMenu from "./controllers/getShortMenu";
import getFullMenu from "./controllers/getFullMenu";

const app: Application = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(cors())

app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));
app.get("/:restaurantId", getRestaurant);
app.get("/:restaurantId/short-menu/:menuName", getShortMenu);
app.get("/:restaurantId/full-menu/:menuName", getFullMenu);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${(error as Error).message}`);
}
