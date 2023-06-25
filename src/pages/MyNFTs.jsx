import { getGlobalState, useGlobalState } from "../store";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserNFTCard from "../components/UserNFTCard";

const MyNFTs = () => {
  const [nfts] = useGlobalState("nfts");
  const connectedAccount = getGlobalState("connectedAccount");

  return (
    <div className="bg-[#151c25] gradient-bg flex flex-col min-h-screen">
      <Header />
      <hr className="h-px w-[85%] m-auto bg-gray-500 border-0 dark:bg-gray-700" />
      <div className="flex-1">
        <div className="w-4/5 py-8 mx-auto">
          <h4
            id="artworks"
            className="text-white lg:text-4xl lg:text-left text-center text-3xl font-bold font-mono py-8 lg:mx-8"
          >
            {nfts.length > 0 ? "Your Balance" : "No balance found!"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 lg:gap-3 py-2.5">
            {nfts.map((nft, i) =>
              nft.owner == connectedAccount ? (
                <UserNFTCard nft={nft} key={i} />
              ) : null
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyNFTs;
