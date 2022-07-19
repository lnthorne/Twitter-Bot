require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	organization: "org-VHxqGVZwucfhFzpYgUHkcRiO",
	apiKey: process.env.openAiKey,
});

const openAI = new OpenAIApi(config);

async function openAiCreateTweet() {
	console.log("openAI.createTweet worked");
	try {
		const tweet = await openAI.createCompletion({
			model: "text-davinci-002",
			prompt: generateRandomPromt(),
			max_tokens: 50,
			temperature: 0.6,
		});

		console.log(tweet.data.choices[0].text);
		return tweet.data.choices[0].text;
	} catch (error) {
		console.log("Error creating tweet OpenAI", error);
	}
}

function generateRandomPromt() {
	const statements = [
		"I love programming!",
		"I hate python!",
		"What is the best programming language?",
		"What is the best computer science school?",
		"I think HTML is not a programming language.",
		"Was laMDA sentient?",
		"Google looks like a great place to work.",
		"My name Jeff.",
	];

	const randomIndex = Math.floor(Math.random() * statements.length);
	console.log(statements[randomIndex]);
	return statements[randomIndex];
}

module.exports = {
	openAiCreateTweet,
};
