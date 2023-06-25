const SandPool = artifacts.require("SandPool");

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts();

  await deployer.deploy(SandPool, "SandPool", "SPN", 10);
};
