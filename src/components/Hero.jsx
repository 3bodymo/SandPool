import Identicon from "react-identicons";
import { setGlobalState, useGlobalState } from "../store";
import { truncateAddress } from "../store";

const importAllHeroImages = (r) => {
  return r.keys().map(r);
};

const heroImages = importAllHeroImages(
  require.context("../assets/images/hero/", false, /\.(png|jpe?g)$/)
);

const randomImg = () => {
  const randNumber = Math.floor(Math.random() * (heroImages.length - 1));
  return heroImages[randNumber];
};

const Hero = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  const createNFTHandler = () => {
    if (!connectedAccount) return alert("Please connect your wallet first!");
    setGlobalState("modal", "scale-100");
  };

  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-20">
      <div className="md:w-3/6 w-full">
        <div>
          <h1 className="text-white lg:text-7xl text-5xl sm:text-6xl font-bold">
            Buy and Sell <br /> Digital Arts, <br />
            <span className="text-gradient">NFTs</span> Collections
          </h1>
          <p className="text-gray-500 font-semibold text-base mt-6">
            Mint and collect the hottest NFTs around.
          </p>
        </div>
        <div className="flex md:w-4/6 w-full justify-between items-start mt-8">
          <button
            className="font-mono bg-[#499177] border-[#137453] text-white font-semibold py-2 px-4 border hover:border-green-500 hover:bg-transparent rounded-full"
            onClick={createNFTHandler}
          >
            Create NFT
          </button>
        </div>
        <div className="w-3/4 flex justify-between items-center mt-10"></div>
      </div>
      <div className="shadow-xl shadow-black md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800">
        <img
          className="h-72 w-full object-cover"
          src={randomImg()}
          alt="Hero"
        />
        {connectedAccount ? (
          <div className="flex justify-start items-center p-3">
            <Identicon
              className="h-10 w-10 object-contain rounded-full mr-3"
              string={connectedAccount}
              size={50}
            />
            <div>
              <p className="text-white font-semibold font-mono">
                {truncateAddress(connectedAccount, 4, 4, 11)}
              </p>
              <small className="text-cyan-400 font-bold font-mono">@you</small>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Hero;
