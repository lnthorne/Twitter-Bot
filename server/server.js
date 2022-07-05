const http = require("http");

const app = require("./app");

require("dotenv").config();
const PORT = 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
