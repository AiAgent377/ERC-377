const ethers = require('ethers');
const { generateTweet } = require('./tweetGenerator');
const { TwitterApi } = require('twitter-api-v2');
const abi = require('../abi/ERC377AI.json');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractWithSigner = contract.connect(signer);

const twitter = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function runAgent(tokenId) {
  const agent = await contract.getAgentMetadata(tokenId);
  const message = await generateTweet(agent);

  const tweet = await twitter.v2.tweet(message);
  console.log(`Tweeted: ${message}`);

  await contractWithSigner.emitAgentTweet(tokenId, message);
}

runAgent(0); // run for tokenId 0
