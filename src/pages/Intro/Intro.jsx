import React, { useEffect } from "react";

import intro from "../../../public/assets/intro.mp4";

import styles from "./styles.module.css";

const Intro = () => {
    useEffect(() => {
        const video = document.querySelector("#video");
        const videoContainer = document.querySelector("#videoContainer");

        video.addEventListener("ended", (event) => {
            videoContainer.style.display = "none";
        });
    }, []);

    return (
        <div className={styles.videoContainer} id="videoContainer">
            <video
                className={styles.video}
                src={intro}
                muted
                autoPlay
                id="video"
            ></video>
        </div>
    );
};

export default Intro;
