require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { TwitterApi } = require("twitter-api-v2");
const { openAiCreateTweet } = require("./generate");

const app = express();

app.use(cors({ origin: true }));

const twitterClient = new TwitterApi({
	clientId: process.env.clientId,
	clientSecret: process.env.clientSecret,
});

const tempStorage = new Map();

const callback = "http://127.0.0.1:3000/ouath/redirect";
const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callback, {
	scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

// listening at the callback URL for the state and code generation
app.get("/", (req, res) => {
	res.redirect(url);
});

app.get("/ouath/redirect", async (req, res) => {
	const { state, code } = req.query;

	const {
		client: loggedClient,
		accessToken,
		refreshToken,
	} = await twitterClient.loginWithOAuth2({
		code,
		codeVerifier,
		redirectUri: callback,
	});

	tempStorage.set("accessToken", accessToken).set("refreshToken", refreshToken);

	timedReq();
});

// Put an axios call in a function and have it make a get request to /refresh everyday;
app.get("/refresh", async (req, res) => {
	const refreshToken = tempStorage.get("refreshToken");

	const {
		client: refreshedClient,
		accessToken,
		refreshToken: newRefreshToken,
	} = await twitterClient.refreshOAuth2Token(refreshToken);

	// store the new access token and refreshToken
	tempStorage.set("accessToken", accessToken).set("refreshToken", newRefreshToken);

	const { data } = await refreshedClient.v2.tweet(await openAiCreateTweet());

	res.send(data);
});

async function timedReq() {
	try {
		const response = await axios.get("http://127.0.0.1:3000/refresh");
	} catch (err) {
		console.log(err);
	}
}
module.exports = app;
