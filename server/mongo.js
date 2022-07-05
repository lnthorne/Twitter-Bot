const mongoose = require("mongoose");

require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

async function mongoConnect() {
	return await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
	return await mongoose.disconnect();
}

mongoose.connection.once("open", () => {
	console.log("Mongoose connection");
});

mongoose.connection.once("error", (err) => {
	console.log("Mongoose connection error", err);
});
