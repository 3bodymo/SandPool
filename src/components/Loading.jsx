import { useGlobalState } from "../store";

const Loading = () => {
  const [loading] = useGlobalState("loading");
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${
        loading.show ? "scale-100" : "scale-0"
      }`}
    >
      <div className="bg-[#151c25] rounded-3xl border-2 border-cyan-600 min-w-min px-10 pb-2">
        <div className="flex flex-col text-white">
          <div className="flex justify-start items-center">
            <div className="lds-dual-ring scale-50"></div>
            <p className="text-lg font-mono">Processing...</p>
          </div>
          <small className="text-center font-sans">{loading.msg}</small>
        </div>
      </div>
    </div>
  );
};

export default Loading;
