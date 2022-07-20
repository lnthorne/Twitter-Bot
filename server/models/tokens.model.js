const { tokens } = require("./mongo");

async function saveTokens(accToken, refToken) {
	// using upsert because we don't want many tokens
	await tokens.updateOne(
		{},
		{
			accessToken: accToken,
			refreshToken: refToken,
		},
		{
			upsert: true,
		}
	);
}

async function getTokens() {
	const response = await tokens.find({});

	return {
		accessToken: response[0].accessToken,
		refreshToken: response[0].refreshToken,
	};
}

module.exports = {
	saveTokens,
	getTokens,
};
