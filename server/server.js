const http = require("http");
require("dotenv").config();

const mongoose = require("./models/mongo");
const app = require("./app");

const PORT = 3000 || process.env.PORT;

const server = http.createServer(app);

async function startServer() {
	await mongoose.mongoConnect();

	server.listen(PORT, () => {
		console.log(`Server listening on ${PORT}`);
	});
}

startServer();
