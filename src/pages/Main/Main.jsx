import React from "react";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import MyBubbles from "../../components/MyBubbles/MyBubbles";
import StartupModal from "../../components/StartupModal/StartupModal";

import cart from "../../../public/assets/cart.svg";

import styles from "./styles.module.css";

const Main = () => {
    return (
        <>
            <div className={styles.pageContainer} id="main">
                <Header name={"VP"} balance={"100 TON"} />
                <MyBubbles />
                <Button
                    text={"BUY MORE BUBBLES"}
                    image={cart}
                    color={"blue"}
                    onClick={() => {
                        let bubblesShop =
                            document.querySelector("#bubbles-shop");
                        let main = document.querySelector("#main");
                        bubblesShop.style.display = "grid";
                        // main.style.display = "none";
                    }}
                />
                <Button
                    color={"blue"}
                    text={"START GAME"}
                    onClick={() => {
                        let main = document.querySelector("#main");
                        let setup = document.querySelector("#setup");
                        setup.style.display = "flex";
                        main.style.display = "none";
                    }}
                />
                <p className={styles.clanName}>MY SQUAD</p>
            </div>
            <StartupModal />
        </>
    );
};

export default Main;
