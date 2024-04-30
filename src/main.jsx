import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Main from "./pages/Main/Main.jsx";
import Setup from "./pages/Setup/Setup.jsx";
import BubblesShop from "./pages/BubblesShop/BubblesShop.jsx";
import Transactions from "./pages/Transactions/Transactions.jsx";
import Receive from "./pages/Receive/Receive.jsx";
import Send from "./pages/Send/Send.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Main />
        <App />
        <Setup />
        <BubblesShop />
        <Transactions />
        <Receive />
        <Send />
    </React.StrictMode>
);

