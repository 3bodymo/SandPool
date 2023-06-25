import Identicon from "react-identicons";
import { FaTimes } from "react-icons/fa";
import {
  setAlert,
  setGlobalState,
  setLoadingMessage,
  truncateAddress,
  useGlobalState,
} from "../store";
import { buyNFT } from "../Blockchain.Services";

const ShowNFT = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [modal] = useGlobalState("showModal");
  const [nft] = useGlobalState("nft");

  const changePriceHandler = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-0");
    setGlobalState("updateModal", "scale-100");
  };

  const buyHandler = async () => {
    setGlobalState("showModal", "scale-0");
    setLoadingMessage("Initializing buying");

    try {
      setLoadingMessage("Approve the transaction");
      await buyNFT(nft);
      setAlert("Purchase completed successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error when purchasing: ", error);
      setAlert("Purchase failed", "red");
    }
  };

  const closeModal = () => {
    setGlobalState("showModal", "scale-0");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] rounded-3xl border-2 border-cyan-600 w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-start text-gray-400">
            <p className="font-semibold font-mono">Buy NFT</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 h-32 w-32 rounded-xl overflow-hidden mb-2">
              <a href={nft?.metadataURI} target="_blank">
                <img
                  className="h-full w-full object-cover object-left-top"
                  src={nft?.metadataURI}
                  alt={nft?.title}
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className="text-white font-mono font-semibold">{nft?.title}</h4>
            <p className="text-gray-400 text-sx my-1 font-sans font-normal">
              {nft?.description}
            </p>
            <div className="flex justify-between items-center mt-3 text-white">
              <div className="flex justify-start items-center">
                <Identicon
                  className="h-10 w-10 object-contain rounded-full mr-3 border-2 border-cyan-600"
                  string={nft?.owner}
                  size={45}
                />
                <div className="flex flex-col justify-center items-start">
                  <small className="ext-white font-semibold font-mono">
                    @owner
                  </small>
                  <small className="text-cyan-600 font-bold font-sans">
                    {truncateAddress(nft?.owner || "", 4, 4, 11)}
                  </small>
                </div>
              </div>
              <div className="flex flex-col text-white font-mono">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold">{nft?.cost} ETH</p>
              </div>
            </div>
          </div>
          {connectedAccount == nft?.owner ? (
            <button
              onClick={changePriceHandler}
              type="submit"
              className="flex flex-row justify-center items-center w-full text-white text-md font-mono bg-cyan-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent hover:bg-transparent hover:text-cyan-500 hover:border-1 hover:border-cyan-600 focus:outline-none focus:ring mt-6"
            >
              Change Price
            </button>
          ) : (
            <button
              onClick={buyHandler}
              type="submit"
              className="flex flex-row justify-center items-center w-full text-white text-md font-mono bg-cyan-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent hover:bg-transparent hover:text-cyan-500 hover:border-1 hover:border-cyan-600 focus:outline-none focus:ring mt-6"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowNFT;
