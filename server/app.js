const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/", (req, res) => {
	const { state, code } = req.query;
	console.log(state, code);
});
