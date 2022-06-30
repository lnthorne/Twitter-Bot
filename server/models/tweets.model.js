const axios = require("axios");

const TWITTER_API_URL = "https://api.twitter.com/2/users/169686021/tweets/?max_results=100";
const TOKEN =
	"AAAAAAAAAAAAAAAAAAAAACEAZgEAAAAAA0R3zLCPnLB4k0fDKQhKfKv6%2BXo%3DS5VICh6lLoCU83YaGBpUBQMRTdOGqDXVhc3AB3pWyB2obj1wMz";

let data = [];

const config = {
	method: "GET",
	url: TWITTER_API_URL,
	headers: { Authorization: "Bearer " + TOKEN },
};

async function populateTweets() {
	console.log("Downloading twitter Data...");
	try {
		const response = await axios(config);
		console.log(response.data);
		data = response.data;
		console.log(data[0] + "model");
	} catch (e) {
		console.log(e);
	}
}

async function getTweet(index) {
	if (data.length === 0) {
		await populateTweets();
	} else if (index > data.length) {
		throw new Error("Index out of bounds");
	}
	return data[index];
}

module.exports = {
	populateTweets,
	getTweet,
};
