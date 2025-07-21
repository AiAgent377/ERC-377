// Could be run on a Chainlink node or via automation job
const { runAgent } = require('../ai/agentRunner');

module.exports = async function () {
  for (let tokenId = 0; tokenId < 5; tokenId++) {
    await runAgent(tokenId);
  }
};
