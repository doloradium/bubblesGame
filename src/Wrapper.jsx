import React, { useState } from "react";

import App from "./App.jsx";
import Main from "./pages/Main/Main.jsx";
import Setup from "./pages/Setup/Setup.jsx";
import BubblesShop from "./pages/BubblesShop/BubblesShop.jsx";
import Transactions from "./pages/Transactions/Transactions.jsx";
import Receive from "./pages/Receive/Receive.jsx";
import Send from "./pages/Send/Send.jsx";
import DefaultModal from "./components/DefaultModal/DefaultModal.jsx";
import Legion from "./pages/Legion/Legion.jsx";
import LoseModal from "./components/LoseModal/LoseModal.jsx";
import Referral from "./pages/Referral/Referral.jsx";
import ModalWeekly from "./components/ModalWeekly/ModalWeekly.jsx";
import Intro from "./pages/Intro/Intro.jsx";
import ModalHODL from "./components/ModalHODL/ModalHODL.jsx";

function Wrapper() {
    const [gameState, setGameState] = useState(false);

    const overflow = 100;
    document.body.style.overflowY = "hidden";
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = window.innerHeight + overflow + "px";
    document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);
    let ts;

    const onTouchStart = (e) => {
        ts = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
        e.preventDefault();
    };

    document.documentElement.addEventListener("touchstart", onTouchStart, {
        passive: false,
    });

    // document.documentElement.addEventListener("touchmove", onTouchMove, {
    //     passive: false,
    // });

    return (
        <div id="wrapper">
            <Main />
            <App gameState={gameState} />
            <Setup onChange={setGameState} />
            <BubblesShop />
            <Transactions />
            <Receive />
            <Send />
            <Legion />
            <Referral />
            <DefaultModal onChange={setGameState} />
            <LoseModal onChange={setGameState} />
            {/* <ModalWeekly />
            <Intro />
            <ModalHODL /> */}
        </div>
    );
}

export default Wrapper;

