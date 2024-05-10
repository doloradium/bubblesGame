import React, { useEffect } from "react";

import introwebm from "../../../public/assets/intro.webm";
import intromp4 from "../../../public/assets/intro.mp4";
import introTon from "../../../public/assets/introTon.svg";
import players from "../../../public/assets/players.svg";

import styles from "./styles.module.css";

const Intro = () => {
    useEffect(() => {
        const video = document.querySelector("#video");
        const videoContainer = document.querySelector("#videoContainer");
        video.addEventListener("play", (event) => {
            setTimeout(() => {
                videoContainer.style.opacity = "0";
                setTimeout(() => {
                    videoContainer.style.display = "none";
                }, 500);
            }, 7000);
        });
    }, []);

    return (
        <div className={styles.videoContainer} id="videoContainer">
            <video
                controls=""
                className={styles.video}
                autoPlay
                playsInline
                muted
                name="media"
                id="video"
            >
                <source src={intromp4} type="video/mp4" />
                <source src={introwebm} type="video/webm" />
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
                        52,865,023,178,340
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
                    <div className={styles.infoParagraph}>23,000,023</div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
