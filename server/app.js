const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { TwitterApi } = require("twitter-api-v2");
const { readNextPartOf } = require("twitter-api-v2/dist/v1/media-helpers.v1");

const app = express();

app.use(cors({ origin: true }));

const twitterClient = new TwitterApi({
	clientId: "N3BFdjNIUUlMWXNBZkpGZURwQ2s6MTpjaQ",
	clientSecret: "htsmzMV2w4Zt_-P7K8bl7xy2tVFk7SdMGIa0obG50WrLGWoNUh",
});

const tempStorage = new Map();

const callback = "http://127.0.0.1:3000/ouath/redirect";
const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callback, {
	scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

// axios.get(callback).catch((err) => {
// 	console.log(err);
// });

// listening at the callback URL for the state and code generation
app.get("/", async (req, res) => {
	console.log("FUCKKKKKKKKKKKKKKKKKKK");
	res.redirect(url);
});

app.get("/ouath/redirect", async (req, res) => {
	console.log("It worked");
	const { state, code } = req.query;

	console.log(req.query);

	const {
		client: loggedClient,
		accessToken,
		refreshToken,
	} = await twitterClient.loginWithOAuth2({
		code,
		codeVerifier,
		redirectUri: callback,
	});

	tempStorage.set({ accessToken: accessToken, refreshToken: refreshToken });

	const { data } = await loggedClient.v2.me();

	res.send(data);
});

module.exports = app;
