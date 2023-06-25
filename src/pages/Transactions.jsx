import { useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { truncateAddress, useGlobalState } from "../store";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Transactions = () => {
  const [transactions] = useGlobalState("transactions");
  const [end, setEnd] = useState(3);
  const [count] = useState(3);
  const [collection, setCollection] = useState([]);

  const getCollection = () => {
    return transactions.slice(0, end);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [transactions, end]);

  return (
    <div className="gradient-bg flex flex-col min-h-screen">
      <Header />
      <hr className="h-px w-[85%] m-auto bg-gray-500 border-0" />

      <div className="flex-1">
        <div className="w-4/5 py-10 mx-auto">
          <h4
            id="transactions"
            className="text-white lg:text-4xl lg:text-left text-center text-3xl font-bold font-mono py-8 lg:mx-8"
          >
            {collection.length > 0
              ? "Latest Transactions"
              : "No transactions found!"}
          </h4>
          <div className="lg:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-2 py-2.5">
            {collection.map((tx, i) => (
              <Transaction key={i} tx={tx} />
            ))}
          </div>
          {collection.length > 0 && transactions.length > collection.length ? (
            <div className="text-center my-5">
              <button
                onClick={() => setEnd(end + count)}
                type="button"
                className="text-white font-mono font-semibold shadow-lg shadow-black bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Load More
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Transaction = ({ tx }) => {
  return (
    <div className="flex justify-between items-center border border-cyan-500 text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
      <div className="rounded-md shadow-sm shadow-cyan-500 p-2">
        <BiTransfer />
      </div>
      <div>
        <h4 className="text-sm font-semibold">NFT ownership transferred</h4>
        <small className="flex justify-start items-center">
          <span className="mr-1">Received by</span>
          <a
            className="text-cyan-500 mr-2 font-semibold"
            href={`/user-nfts/${tx.owner}`}
            target="_blank"
          >
            {truncateAddress(tx.owner, 4, 4, 11)}
          </a>
          <MdOpenInNew />
        </small>
      </div>
      <span className="eth text-sm">{Math.round(tx.cost * 100) / 100} ETH</span>
    </div>
  );
};

export default Transactions;
