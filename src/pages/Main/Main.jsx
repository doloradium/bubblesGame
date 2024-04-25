import React from "react";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import MyBubbles from "../../components/MyBubbles/MyBubbles";

import coin from "../../../public/assets/coin.svg";

import styles from "./styles.module.css";

const Main = () => {
    return (
        <>
            <div className={styles.pageContainer} id="main">
                <Header name={"VP"} balance={"100 ton"} />
                <MyBubbles />
                <Button text={"BUY MORE"} image={coin} />
                <Button
                    text={"START GAME"}
                    onClick={() => {
                        let app = document.querySelector("#app");
                        let main = document.querySelector("#main");
                        app.style.display = "block";
                        main.style.display = "none";
                    }}
                />
                <p className={styles.clanName}>MY SQUAD</p>
            </div>
        </>
    );
};

export default Main;
