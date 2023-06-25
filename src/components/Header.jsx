import { useEffect } from "react";
import SandPool from "../assets/images/SandPool-1.png";
import {
  connectWallet,
  getAllNFTs,
  getCurrentNFTs,
  getTopNFTs,
  isWalletConnected,
} from "../Blockchain.Services";
import { truncateAddress, useGlobalState } from "../store";

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(async () => {
    await isWalletConnected();
    await getAllNFTs();
    await getCurrentNFTs();
    getTopNFTs();
  }, []);

  return (
    <div className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
      <div className="md:flex-auto flex-initial justify-center items-center">
        <a href="/">
          <img
            className="w-32 lg:w-44 cursor-pointer"
            src={SandPool}
            alt="Logo"
          />
        </a>
      </div>
      <ul className="md:flex-auto text-white md:flex hidden list-none justify-between items-center flex-initial">
        <li className="mx-4 cursor-pointer font-mono lg:text-lg text-base">
          <a href="/explore-market">Market</a>
        </li>
        <li className="mx-4 cursor-pointer font-mono lg:text-lg text-base">
          <a href="/transactions">Transactions</a>
        </li>
        <li className="mx-4 cursor-pointer font-mono lg:text-lg text-base">
          <a href="/my-nfts">My NFTs</a>
        </li>
      </ul>
      {connectedAccount ? (
        <button className="md:h-12 md:w-36 md:ml-32 font-mono bg-transparent text-white font-semibold py-2 px-4 border border-green-500 rounded-full md:text-sm cursor-default">
          {truncateAddress(connectedAccount, 4, 4, 11)}
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="md:h-12 md:w-36 md:ml-32 font-mono bg-transparent hover:bg-[#49917771] text-white font-semibold py-2 px-4 border border-green-500 hover:border-white hover:border-transparent rounded-full md:text-sm"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Header;
