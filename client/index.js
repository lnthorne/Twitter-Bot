const { TwitterApi } = require("twitter-api-v2");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const callback = "http://127.0.0.1:3000";
const dbRef = new Map();
const app = express();

app.use(cors({ origin: true }));

const twitterClient = new TwitterApi({
	clientId: "N3BFdjNIUUlMWXNBZkpGZURwQ2s6MTpjaQ",
	clientSecret: "5A86U4sImuLTveMHlRu78doXb9fGGmwWWPfvG-A19HenkxflQC",
});

const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callback, {
	scope: [["tweet.read", "tweet.write", "users.read", "offline.access"]],
});

dbRef.set({ codeVerifier, state });

// listening at the callback URL for the state and code generation
app.use("/", (req, res) => {
	res.redirect(url);
});

app.get("/", (req, res) => {
	const { state, code } = req.query;
	console.log(state, code);
});

// 1. Create the authorization URL

// 2. We have the callback UR LIVE! (SERVER) to grab what is sent to it
