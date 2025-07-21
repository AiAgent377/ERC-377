const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function generateTweet(agent) {
  const prompt = `Write a tweet from an AI agent named ${agent.persona} with personality traits matching a ${agent.persona}. They are autonomous and connected to the blockchain.`;

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.data.choices[0].message.content.trim();
}

module.exports = { generateTweet };
