import Identicon from "react-identicons";
import iconView from "../assets/images/NFTCard/icon-view.svg";
import iconEthereum from "../assets/images/NFTCard/icon-ethereum.svg";
import { setGlobalState, truncateAddress, truncateText } from "../store";

const MarketNFTCard = ({ nft }) => {
  const setNFT = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-100");
  };

  return (
    <section className="main-card">
      <div className="image-container h-[285px] w-[285px]">
        <img
          src={nft.metadataURI}
          alt={nft.title}
          className="main-image h-full w-full object-cover object-left-top"
        />
        <div className="overlay" onClick={setNFT} />
        <img src={iconView} alt="view icon" className="view" />
      </div>
      <div className="text-container">
        <h1 className="title" onClick={setNFT}>
          {nft.title}
        </h1>
        <p className="description md:h-14 lg:h-7">
          {truncateText(nft.description, 25)}
        </p>
        <div className="eth-info">
          <div className="info">
            <img src={iconEthereum} alt="ETH" className="icon" />
            <span className="eth">{nft.cost} ETH</span>
          </div>
        </div>
        <div className="creator-info">
          <Identicon
            className="avatar border-2 border-cyan-400 rounded-full"
            string={nft.owner}
            size={40}
          />
          <p className="creator-text font-semibold">
            Owner of{" "}
            <a href={`/user-nfts/${nft.owner}`}>
              <span className="creator-name font-semibold">
                {truncateAddress(nft.owner, 4, 4, 11)}
              </span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketNFTCard;
