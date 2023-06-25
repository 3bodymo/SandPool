import DefaultNFT from "../assets/images/defaultNFT.png";
import iconView from "../assets/images/NFTCard/icon-view.svg";
import iconEthereum from "../assets/images/NFTCard/icon-ethereum.svg";
import { setGlobalState, truncateAddress, truncateText } from "../store";

const NFTCard = ({ nft }) => {
  const setNFT = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-100");
  };

  return (
    <section className="main-card">
      <div className="image-container h-[285px] w-[285px]">
        <img
          src={nft.metadataURI ? nft.metadataURI : DefaultNFT}
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
        <div className="eth-info-user-card">
          <div className="info">
            <img src={iconEthereum} alt="ETH" className="icon" />
            <span className="eth">{nft.cost} ETH</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTCard;
