import React, { useEffect } from "react";

import introwebm from "../../../public/assets/intro.webm";

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
                muted
                name="media"
                id="video"
            >
                <source src={introwebm} type="video/webm" />
            </video>
        </div>
    );
};

export default Intro;
