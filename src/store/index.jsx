import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: "scale-0",
  showModal: "scale-0",
  updateModal: "scale-0",
  loading: { show: false, msg: "" },
  alert: { show: false, msg: "", color: "" },
  connectedAccount: "",
  owners: [],
  nft: null,
  nfts: [],
  allNFTs: [],
  topNFTs: [],
  transactions: [],
  contract: null,
});

const setAlert = (msg, color = "green") => {
  setGlobalState("loading", { show: false, msg: "" });
  setGlobalState("alert", { show: true, msg, color });
  setTimeout(() => {
    setGlobalState("alert", { show: false, msg, color });
  }, 6000);
};

const setLoadingMessage = (msg) => {
  setGlobalState("loading", { show: true, msg });
};

const truncateAddress = (address, startChars, endChars, maxLength) => {
  if (address.length > maxLength) {
    var start = address.substring(0, startChars);
    var end = address.substring(address.length - endChars, address.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return address;
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    var newText = text.substring(0, maxLength);
    newText = newText + "...";
    return newText;
  }
  return text;
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setLoadingMessage,
  setAlert,
  truncateAddress,
  truncateText,
};
