import React from "react";
import useSound from "use-sound";

import click from "../../../public/sounds/button.mp3";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import MyBubbles from "../../components/MyBubbles/MyBubbles";
import StartupModal from "../../components/StartupModal/StartupModal";

import cart from "../../../public/assets/cart.svg";

import styles from "./styles.module.css";

const Main = () => {
    const [play] = useSound(click);

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
                        bubblesShop.style.display = "grid";
                        setTimeout(() => {
                            bubblesShop.style.opacity = 1;
                        }, 100);
                    }}
                />
                <Button
                    color={"white"}
                    text={"START GAME"}
                    onClick={() => {
                        let setup = document.querySelector("#setup");
                        setup.style.display = "flex";
                        setTimeout(() => {
                            setup.style.opacity = 1;
                        }, 100);
                    }}
                />
                <p
                    className={styles.clanName}
                    onClick={() => {
                        play();
                        let referral = document.querySelector("#referral");
                        referral.style.display = "flex";
                        setTimeout(() => {
                            referral.style.opacity = 1;
                        }, 100);
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

