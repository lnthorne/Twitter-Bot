const { getTweet } = require("../models/tweets.model");

const MAX_INDEX = 100;

async function getRandomTweet() {
	const randomNum = Math.floor(Math.random() * MAX_INDEX);
	console.log(randomNum);

	return await getTweet(randomNum);
}

async function hello() {
	const test = await getRandomTweet();
	console.log(test + "What th efuck");
}
hello();
