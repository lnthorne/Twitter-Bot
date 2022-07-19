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
	const topics = [
		"C++",
		"Linux",
		"iOS",
		"JavaScript",
		"TypeScript",
		"Silicon Valley",
		"Steve Jobs",
		".NET",
		"Unity",
		"Virtual Reality",
		"Google",
		"Node.js",
		"React",
		"#ReactJS",
		"CSS",
		"Bitcoin",
		"Dark Web",
		"Xbox",
		"Bill Gates",
		"Facebook",
		"Meta",
		"Oculus",
		"Programming Frameworks",
		"Coding youtubers",
		"Database",
		"Computer Science",
		"The future",
		"Terminator",
		"Augmented Reality",
		"Halo",
		"Video Games",
		"laMDA",
		"Math",
		"Crypto Currency",
		"Travel",
		"Music",
		"iPhone",
		"Open Source",
		"Steam",
	];

	const statements = [
		"how Elon Musk created it",
		"the current state of the world",
		"how large your mother is",
		"Tik Tok taking over the world",
		"making it a NFT",
		"Marc Zuckerberg being a robot",
		"aliens",
		"Canada",
		"Alaska joining Canada",
		"how much The Rock works out",
		"going to mars",
		"something trending on twitter",
		"clean desk setups",
		"Linus Tech Tips",
		"how sentient you are",
		"Will Smith",
		"taking over the world",
	];
	const randomStatement = Math.floor(Math.random() * statements.length);
	const randomTopic = Math.floor(Math.random() * topics.length);
	console.log(topics[randomTopic], statements[randomStatement]);
	return (
		"Tweet something about " +
		topics[randomTopic] +
		" and add something about " +
		statements[randomStatement]
	);
}

module.exports = {
	openAiCreateTweet,
};
