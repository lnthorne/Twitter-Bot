const { TwitterApi } = require("twitter-api-v2");

require("dotenv").config();

const twitterClient = new TwitterApi({
	clientId: "N3BFdjNIUUlMWXNBZkpGZURwQ2s6MTpjaQ",
	clientSecret: "5A86U4sImuLTveMHlRu78doXb9fGGmwWWPfvG-A19HenkxflQC",
});

const callback = "http://127.0.0.1:3000";

const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callback, {
	scope: [["tweet.read", "tweet.write", "users.read", "offline.access"]],
});

// 1. Create the authorization URL

// 2. We have the callback UR LIVE! (SERVER) to grab what is sent to it
