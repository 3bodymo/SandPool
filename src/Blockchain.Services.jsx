import Web3 from "web3";
import { setGlobalState, getGlobalState, setAlert } from "./store";
import abi from "./abis/SandPool.json";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = abi.networks[networkId];

    if (networkData) {
      const contract = new web3.eth.Contract(abi.abi, networkData.address);
      return contract;
    } else {
      return null;
    }
  } else {
    return getGlobalState("contract");
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask!");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0].toLowerCase());
  } catch (error) {
    JSON.stringify(error).includes("rejected the request")
      ? reportManualError("User rejected the request")
      : reportError(error);
  }
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask!");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", async (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
    } else {
      // console.log("No account found!");
    }
  } catch (error) {}
};

const mintNFT = async ({ title, price, description, metadataURI }) => {
  try {
    price = window.web3.utils.toWei(price.toString(), "ether");
    const contract = await getEthereumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    await contract.methods
      .payToMint(title, price, description, metadataURI)
      .send({ from: connectedAccount });
    return true;
  } catch (error) {
    reportError(error);
  }
};

const updateNFTPrice = async ({ tokenId, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), "ether");
    const contract = await getEthereumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    await contract.methods
      .changePrice(Number(tokenId), cost)
      .send({ from: connectedAccount });
  } catch (error) {
    reportError(error);
  }
};

const buyNFT = async ({ tokenId, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), "ether");
    const contract = await getEthereumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    await contract.methods
      .payToBuy(Number(tokenId))
      .send({ from: connectedAccount, value: cost });
  } catch (error) {
    reportError(error);
  }
};

const getOwners = () => {
  const nfts = getGlobalState("nfts");
  let owners = [];
  nfts.forEach((nft) => {
    if (!owners.includes(nft.owner)) {
      owners.push(nft.owner);
    }
  });

  setGlobalState("owners", owners);
};

const getTopNFTs = () => {
  const MAX_NUMBER = 10;
  if (!ethereum) return alert("Please install MetaMask!");
  const transactions = getGlobalState("transactions");
  const idCounts = transactions.reduce((counts, nft) => {
    counts[nft.tokenId] = (counts[nft.tokenId] || 0) + 1;
    return counts;
  }, {});
  const sortedIds = Object.keys(idCounts).sort(
    (a, b) => idCounts[b] - idCounts[a]
  );

  let topNFTs = [];
  const nfts = getGlobalState("allNFTs");
  for (let i = 0; i < sortedIds.length && i < MAX_NUMBER; i++) {
    if (nfts[sortedIds[i] - 1]["tokenId"] != 0)
      topNFTs.push(nfts[sortedIds[i] - 1]);
  }
  setGlobalState("topNFTs", topNFTs);
};

const getCurrentNFTs = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask!");
    const contract = await getEthereumContract();
    const nfts = await contract.methods.getAllNFTs().call();
    const transactions = await contract.methods.getAllTransactions().call();
    setGlobalState("nfts", structuredCurrentNFTs(nfts));
    setGlobalState("transactions", structuredCurrentNFTs(transactions));
  } catch (error) {
    // reportError(error);
  }
};

const getAllNFTs = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask!");
    const contract = await getEthereumContract();
    const nfts = await contract.methods.getAllNFTs().call();
    setGlobalState("allNFTs", structuredAllNFTs(nfts));
  } catch (error) {
    // reportError(error);
  }
};

const structuredCurrentNFTs = (nfts) => {
  return nfts
    .filter((nft) => nft.tokenId != 0)
    .map((nft) => ({
      tokenId: Number(nft.tokenId),
      owner: nft.owner.toLowerCase(),
      cost: window.web3.utils.fromWei(nft.cost),
      title: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      timestamp: nft.timestamp,
    }))
    .reverse();
};

const structuredAllNFTs = (nfts) => {
  return nfts.map((nft) => ({
    tokenId: Number(nft.tokenId),
    owner: nft.owner.toLowerCase(),
    cost: window.web3.utils.fromWei(nft.cost),
    title: nft.title,
    description: nft.description,
    metadataURI: nft.metadataURI,
    timestamp: nft.timestamp,
  }));
};

const reportError = (error) => {
  setAlert(JSON.stringify(error), "red");
  throw new Error("No ethereum object.");
};

const reportManualError = (error) => {
  setAlert(error, "red");
  throw new Error("No ethereum object.");
};

export {
  connectWallet,
  isWalletConnected,
  mintNFT,
  getCurrentNFTs,
  getAllNFTs,
  updateNFTPrice,
  buyNFT,
  getTopNFTs,
  getOwners,
};
