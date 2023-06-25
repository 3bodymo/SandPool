import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import MyNFTs from "./pages/MyNFTs";
import { NotFound } from "./pages/NotFound";
import Transactions from "./pages/Transactions";
import NFTsOfAddress from "./pages/NFTsOfAddress";
import Artworks from "./pages/Artworks";
import CreateNFT from "./components/CreateNFT";
import ShowNFT from "./components/ShowNFT";
import UpdateNFT from "./components/UpdateNFT";
import Loading from "./components/Loading";
import Alert from "./components/Alert";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <>
              <App />
              <CreateNFT />
              <Alert />
              <Loading />
            </>
          }
        />
        <Route path="transactions" element={<Transactions />} />
        <Route
          path="explore-market"
          element={
            <>
              <Artworks />
              <ShowNFT />
              <UpdateNFT />
              <Loading />
              <Alert />
            </>
          }
        />
        <Route
          path="my-nfts"
          element={
            <div>
              <MyNFTs />
              <ShowNFT />
              <UpdateNFT />
              <Loading />
              <Alert />
            </div>
          }
        />
        <Route
          path="user-nfts/:address"
          element={
            <div>
              <NFTsOfAddress />
              <ShowNFT />
              <UpdateNFT />
              <Loading />
              <Alert />
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
