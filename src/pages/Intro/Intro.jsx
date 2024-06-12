import React, { useEffect, useState } from "react";

import { useFetch } from "../../hooks/useFetch";
import { getTotalPlayers } from "../../api/apiBubbles";

import userInfo from "../../data/userInfo";

import introwebm from "../../../public/assets/intro.webm";
import intromp4 from "../../../public/assets/intro.mp4";
import intropng from "../../../public/assets/intro.png";
import introTon from "../../../public/assets/introTon.svg";
import players from "../../../public/assets/players.svg";

import styles from "./styles.module.css";

const Intro = () => {
    const { data } = useFetch(getTotalPlayers);

    const searchParams = new URLSearchParams(window.location.search);
    userInfo.token = searchParams.get("token");
    userInfo.telegram_id = searchParams.get("telegram_id");
    console.log(userInfo.token, userInfo.telegram_id);

    useEffect(() => {
        const video = document.querySelector("#video");
        const videoContainer = document.querySelector("#videoContainer");
        let oldTimeout = setTimeout(() => {
            videoContainer.style.opacity = "0";
            setTimeout(() => {
                videoContainer.style.display = "none";
            }, 500);
        }, 3000);
        video.addEventListener("play", (event) => {
            video.style.zIndex = 3;
            clearTimeout(oldTimeout);
            let newTimeout = setTimeout(() => {
                videoContainer.style.opacity = "0";
                setTimeout(() => {
                    videoContainer.style.display = "none";
                }, 500);
            }, 7000);
        });
    }, []);

    return (
        <div className={styles.videoContainer} id="videoContainer">
            <img
                src={intropng}
                alt="Intro"
                id="image"
                className={styles.introImage}
            />
            <video
                controls={false}
                className={styles.video}
                autoPlay
                playsInline
                muted
                name="media"
                preload="auto"
                id="video"
            >
                <source src={introwebm} type="video/webm" />
                <source src={intromp4} type="video/mp4" />
            </video>
            <div className={styles.infoContainer}>
                <div className={styles.infoBlock}>
                    <div className={styles.infoHeader}>
                        <img
                            src={introTon}
                            alt="Coin"
                            className={styles.infoImage}
                        />
                        <div className={styles.infoHeading}>
                            Total player earnings
                        </div>
                    </div>
                    <div className={styles.infoParagraph}>
                        {data && data.player_count}
                    </div>
                </div>
                <div className={styles.infoBlock}>
                    <div className={styles.infoHeader}>
                        <img
                            src={players}
                            alt="Players"
                            className={styles.infoImage}
                        />
                        <div className={styles.infoHeading}>Total players</div>
                    </div>
                    <div className={styles.infoParagraph}>
                        {data && data.player_count}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;

