const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { TwitterApi } = require("twitter-api-v2");

const app = express();

app.use(cors({ origin: true }));

const twitterClient = new TwitterApi({
	clientId: "N3BFdjNIUUlMWXNBZkpGZURwQ2s6MTpjaQ",
	clientSecret: "5A86U4sImuLTveMHlRu78doXb9fGGmwWWPfvG-A19HenkxflQC",
});

const callback = "http://127.0.0.1:3000/ouath/redirect";
const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callback, {
	scope: [["tweet.read", "tweet.write", "users.read", "offline.access"]],
});

// listening at the callback URL for the state and code generation
app.get("/ouath/redirect", async (req, res) => {
	console.log(url);
	const auth = await axios.post(url);

	console.log(auth.data);
});
