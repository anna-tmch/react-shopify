import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Client from "shopify-buy";

const client = Client.buildClient({
  storefrontAccessToken: "your-access-token",
  domain: "your-store.myshopify.com",
});

ReactDOM.render(<App client={client} />, document.getElementById("root"));
