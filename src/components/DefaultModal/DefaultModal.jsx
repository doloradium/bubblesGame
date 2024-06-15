import React from "react";

import arrowBack from "../../../public/assets/arrowBack.svg";
import thinkingEmoji from "../../../public/assets/thinkingEmoji.png";

import Button from "../Button/Button";

import websocketManager from "../../data/websocketManager";
import websocketStats from "../../data/websocketStats";

import styles from "./styles.module.css";

const DefaultModal = ({ onChange, changeBet }) => {
    return (
        <div className={styles.modalContainer} id="defaultModal">
            <div className={styles.modalGrid}>
                <div className={styles.modalItem}>
                    <div className={styles.modalCross}>
                        <Button
                            className={styles.closeButton}
                            image={arrowBack}
                            onClick={() => {
                                let defaultModal =
                                    document.querySelector("#defaultModal");
                                defaultModal.style.opacity = 0;
                                setTimeout(() => {
                                    defaultModal.style.display = "none";
                                }, 500);
                            }}
                        />
                    </div>
                </div>
                <div className={styles.modalItem}>
                    <svg viewBox="0 0 11 11" className={styles.cornerTop}>
                        <path d="M0.0410737 0H0V11H11V10.9589C5.1702 10.478 0.522022 5.8298 0.0410737 0Z" />
                    </svg>
                </div>
                <div className={styles.modalItem}>
                    <svg viewBox="0 0 11 11" className={styles.cornerBottom}>
                        <path d="M10.9589 11H11V0H0V0.0410738C5.8298 0.522022 10.478 5.1702 10.9589 11Z" />
                    </svg>
                </div>
                <div className={styles.modalBlock}>
                    <img
                        className={styles.modalImage}
                        src={thinkingEmoji}
                        alt={"Emoji"}
                    />
                    <div className={styles.modalInfo}>
                        <h2 className={styles.modalHeading}>
                            Are you sure you
                            <br /> want to leave?
                        </h2>
                        <p className={styles.modalSubheading}>
                            Your points and money
                            <br /> will be lost
                        </p>
                    </div>
                    <Button
                        text={"NO"}
                        color={"extraWhite"}
                        className={styles.modalButton}
                        onClick={() => {
                            let defaultModal =
                                document.querySelector("#defaultModal");
                            defaultModal.style.opacity = 0;
                            setTimeout(() => {
                                defaultModal.style.display = "none";
                            }, 100);
                        }}
                    />
                    <Button
                        text={"YES"}
                        color={"white"}
                        className={styles.secondaryButton}
                        onClick={() => {
                            onChange(false);
                            let defaultModal =
                                document.querySelector("#defaultModal");
                            let app = document.querySelector("#app");
                            let setup = document.querySelector("#setup");
                            let stats = document.querySelector("#stats");
                            app.style.display = "none";
                            defaultModal.style.display = "none";
                            setup.style.display = "none";
                            websocketManager.forEach((item) => {
                                item.socket.close();
                                clearInterval(item.timer);
                            });
                            websocketStats.status = "loading";
                            changeBet(0.1);
                            websocketStats.bet = 0.1;
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DefaultModal;

