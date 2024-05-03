import React, { useEffect } from "react";

import intro from "../../../public/assets/intro.mp4";

import styles from "./styles.module.css";

const Intro = () => {
    useEffect(() => {
        const video = document.querySelector("#video");
        const videoContainer = document.querySelector("#videoContainer");

        window.addEventListener("load", (event) => {
            video.play();
        });

        setInterval(() => {
            videoContainer.style.display = "none";
        }, 8000);
    }, []);

    return (
        <div className={styles.videoContainer} id="videoContainer">
            <video
                className={styles.video}
                autoplay="true"
                muted="muted"
                id="video"
            >
                <source src={intro} type="video/mp4" />
            </video>
        </div>
    );
};

export default Intro;
