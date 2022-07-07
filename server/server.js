const http = require("http");

const app = require("./app");

require("dotenv").config();
const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
