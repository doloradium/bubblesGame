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
                    color={"white"}
                    onClick={() => {
                        let bubblesShop =
                            document.querySelector("#bubbles-shop");
                        let main = document.querySelector("#main");
                        bubblesShop.style.display = "grid";
                    }}
                />
                <Button
                    color={"white"}
                    text={"START GAME"}
                    onClick={() => {
                        let main = document.querySelector("#main");
                        let setup = document.querySelector("#setup");
                        setup.style.display = "flex";
                        main.style.display = "none";
                    }}
                />
                <p
                    className={styles.clanName}
                    onClick={() => {
                        let referral = document.querySelector("#referral");
                        referral.style.display = "flex";
                    }}
                >
                    MY SQUAD
                </p>
            </div>
            <StartupModal />
        </>
    );
};

export default Main;
