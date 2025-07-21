const { ethers } = require('ethers');
const fs = require('fs');
const abi = JSON.parse(fs.readFileSync('./abi/ERC377AI.json'));
require('dotenv').config();

async function deploy() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const factory = new ethers.ContractFactory(abi.abi, abi.bytecode, wallet);
  const contract = await factory.deploy();
  console.log(`Contract deployed at ${contract.address}`);
}

deploy();


