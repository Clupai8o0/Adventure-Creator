const express = require("express");
const path = require("path");
const idGenerator = require("./algorithm");

//* database
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = process.env.MONGODB_URL; // * if u had used localhost instead of 127.0... it slows down the app
const databaseName = "cursed-bot-database"; // ? database name\
let db = undefined;
MongoClient.connect(
	connectionURL,
	{
		useNewUrlParser: true,
	},
	(error, client) => {
		if (error) return console.log("Unable to connect to database");
		console.log("Successfully connected to database");
		db = client.db(databaseName);
	}
);

const app = express();
const port = process.env.PORT;
const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));
app.use(express.urlencoded({ extended: true }));

app.post("/add", async (req, res) => {
	const { name, description, level, time, money, xp, url } = req.body;
	const adventure = {
		name,
		description,
		id: idGenerator(
			level,
			await db.collection("adventures").find({}).toArray()
		),
		requirements: {
			level: parseInt(level),
			time: parseInt(time),
			atk: (parseInt(level) ** 2 * 100) / 1000,
			def: (parseInt(level) ** 2 * 100) / 1000,
		},
		reward: {
			money: parseInt(money),
			xp: parseInt(xp),
		},
		url,
	};
	await db.collection("adventures").insertOne(adventure);
	res.status(200).redirect("/");
});

app.get("*", (req, res) => {
	res.status(400).send("<h1>Page not found</h1>");
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
