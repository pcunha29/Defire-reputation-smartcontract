import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://j9gtqgkkhofe.usemoralis.com:2053/server"
      appId="LCPDR5y5MP0ef10JZI2DaPXk3A08zQm6MF4KApBN"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
