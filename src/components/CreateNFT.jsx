import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import DefaultNFT from "../assets/images/defaultNFT.png";
import {
  setAlert,
  setGlobalState,
  setLoadingMessage,
  useGlobalState,
} from "../store";
import { create } from "ipfs-http-client";
import { mintNFT } from "../Blockchain.Services";

const auth =
  "Basic " +
  Buffer.from(
    process.env.REACT_APP_INFURA_PID +
      ":" +
      process.env.REACT_APP_INFURA_API_KEY_SECRET
  ).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const CreateNFT = () => {
  const [modal] = useGlobalState("modal");

  const [imgBase64, setImgBase64] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;
    setGlobalState("modal", "scale-0");
    setLoadingMessage("Uploading to IPFS");
    try {
      const { path } = await client.add(fileUrl);
      setLoadingMessage("Approve the transaction");
      const metadataURI = `https://ipfs.io/ipfs/${path}`;
      const nft = { title, price, description, metadataURI };
      await mintNFT(nft);
      resetForm();
      setAlert("Minting completed");
      window.location.reload();
    } catch (error) {
      console.log("Error when uploading file: ", error);
      setAlert("Minting Failed", "red");
    }
  };

  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };

  const closeModal = () => {
    setGlobalState("modal", "scale-0");
    resetForm();
  };

  const resetForm = () => {
    setImgBase64(null);
    setTitle("");
    setPrice("");
    setDescription("");
    setFileUrl("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] rounded-3xl border-2 border-cyan-600 w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-start text-gray-400">
            <p className="font-semibold font-mono">Create NFT</p>
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
                src={imgBase64 || DefaultNFT}
                alt="NFT"
              />
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only font-mono">Choose Photo</span>
              <input
                onChange={changeImage}
                className="block font-mono w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:font-mono file:font-semibold focus:outline-none hover:file:bg-gray-300 cursor-pointer focus:ring-0"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                required
              />
            </label>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block font-mono bg-transparent border-0 w-full text-sm text-slate-500 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
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
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea
              className="block font-mono bg-transparent border-0 h-20 resize-none w-full text-sm text-slate-500 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="flex flex-row justify-center items-center w-full text-white text-md font-mono bg-cyan-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent hover:bg-transparent hover:text-cyan-500 hover:border-1 hover:border-cyan-600 focus:outline-none focus:ring mt-6"
          >
            Mint Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;
