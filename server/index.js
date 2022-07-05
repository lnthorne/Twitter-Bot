const rwTwitterClient = require("../client/index");

async function tweet() {
	try {
		await rwTwitterClient.v1.tweet("Test message");
	} catch (e) {
		console.log("we have an error", e);
	}
}

tweet();
