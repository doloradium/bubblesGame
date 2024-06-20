import React from "react";
import useSound from "use-sound";

import click from "../../../public/sounds/button.mp3";

import userInfo from "../../data/userInfo";

import { useFetch } from "../../hooks/useFetch";
import { getBubbles, getMe } from "../../api/apiBubbles";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import MyBubbles from "../../components/MyBubbles/MyBubbles";
import StartupModal from "../../components/StartupModal/StartupModal";

import cart from "../../../public/assets/cart.svg";

import styles from "./styles.module.css";

const Main = () => {
    const [play] = useSound(click);

    const dataBubbles = useFetch(getBubbles).data;
    const dataMe = useFetch(getMe).data;

    const searchParams = new URLSearchParams(window.location.search);
    userInfo.token = searchParams.get("token");
    userInfo.telegram_id = searchParams.get("telegram_id");

    getMe().then((value) => (userInfo.wallet = value.wallet));

    return (
        <>
            <div className={styles.pageContainer} id="main">
                <Header balance={dataMe?.balance} />
                <MyBubbles
                    bubbleList={dataBubbles?.bubbles}
                    myBubbles={dataBubbles?.my}
                />
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
            <StartupModal lastUpdate={dataMe?.last_update} />
        </>
    );
};

export default Main;

