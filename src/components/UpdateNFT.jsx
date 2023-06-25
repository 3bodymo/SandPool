import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { updateNFTPrice } from "../Blockchain.Services";
import {
  setAlert,
  setGlobalState,
  setLoadingMessage,
  useGlobalState,
} from "../store";

const UpdateNFT = () => {
  const [modal] = useGlobalState("updateModal");
  const [nft] = useGlobalState("nft");
  const [price, setPrice] = useState(nft?.cost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price || price <= 0) return;
    setGlobalState("modal", "scale-0");
    setLoadingMessage("Initializing price update");

    try {
      setLoadingMessage("Updating price");
      setGlobalState("updateModal", "scale-0");
      await updateNFTPrice({ tokenId: nft.tokenId, cost: price });
      setAlert("Price updated successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error when uploading price: ", error);
      setAlert("Price update failed", "red");
    }
  };

  const closeModal = () => {
    setGlobalState("updateModal", "scale-0");
    resetForm();
  };

  const resetForm = () => {
    setPrice("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] rounded-3xl border-2 border-cyan-600 w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-start text-gray-400">
            <p className="font-semibold font-mono">Change Price</p>
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
              <img
                className="h-full w-full object-cover object-left-top"
                src={nft?.metadataURI}
                alt={nft?.title}
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block font-mono bg-transparent border-0 w-full text-sm text-slate-500 focus:ring-0 focus:outline-none"
              type="number"
              placeholder="Price (ETH)"
              min={0}
              step={0.01}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center w-full text-white text-md font-mono bg-cyan-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent hover:bg-transparent hover:text-cyan-500 hover:border-1 hover:border-cyan-600 focus:outline-none focus:ring mt-6"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNFT;
