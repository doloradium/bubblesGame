import React, { useEffect } from "react";

import intro from "../../../public/assets/intro.mp4";

import styles from "./styles.module.css";

const Intro = () => {
    useEffect(() => {
        // window.addEventListener("load", (event) => {
        //     const video = document.querySelector("#video");
        //     const videoContainer = document.querySelector("#videoContainer");
        //     video.muted;
        //     video.pause();
        //     video.play();
        // });
        // setInterval(() => {
        //     videoContainer.style.display = "none";
        // }, 8000);
    }, []);

    return (
        <div className={styles.videoContainer} id="videoContainer">
            {/* <video className={styles.video} controls id="video">
                <source src={intro} type="video/mp4" />
            </video> */}

            <video
                controls=""
                className={styles.video}
                autoPlay
                muted
                name="media"
            >
                <source src={intro} type="video/mp4" />
            </video>
        </div>
    );
};

export default Intro;
