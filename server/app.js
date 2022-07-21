const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cron = require("node-cron");
const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const { openAiCreateTweet } = require("./generate");

const dbRef = require("./models/tokens.model");

const app = express();

const twitterClient = new TwitterApi({
	clientId: process.env.clientId,
	clientSecret: process.env.clientSecret,
});

const callback = "http://127.0.0.1:3000/ouath/redirect";
const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callback, {
	scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

app.use(cors({ origin: true }));

// initial request
app.get("/", (req, res) => {
	res.redirect(url);
});

app.get("/ouath/redirect", async (req, res) => {
	const { state, code } = req.query;

	const { accessToken, refreshToken } = await twitterClient.loginWithOAuth2({
		code,
		codeVerifier,
		redirectUri: callback,
	});

	await dbRef.saveTokens(accessToken, refreshToken);

	cron.schedule("* * 4 * * *", () => {
		timedReq();
	});
});

// Put an axios call in a function and have it make a get request to /refresh everyday;
app.get("/refresh", async (req, res) => {
	const { refreshToken } = await dbRef.getTokens();

	const {
		client: refreshedClient,
		accessToken,
		refreshToken: newRefreshToken,
	} = await twitterClient.refreshOAuth2Token(refreshToken);

	// store the new access token and refreshToken
	await dbRef.saveTokens(accessToken, newRefreshToken);

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
