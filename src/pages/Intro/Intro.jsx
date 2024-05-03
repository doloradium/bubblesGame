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

        setInterval(() => {
            videoContainer.style.display = "none";
        }, 8000);
    }, []);

    return (
        <div className={styles.videoContainer} id="videoContainer">
            <video className={styles.video} controls id="video">
                <source src={intro} type="video/mp4" />
            </video>
        </div>
    );
};

export default Intro;
