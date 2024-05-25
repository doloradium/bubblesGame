import React from "react";
import clsx from "clsx";

import arrowBack from "../../../public/assets/arrowBack.svg";
import thinkingEmoji from "../../../public/assets/thinkingEmoji.png";
import deadEmoji from "../../../public/assets/deadEmoji.png";

import Button from "../Button/Button";

import websocketManager from "../../data/websocketManager";
import websocketStats from "../../data/websocketStats";

import styles from "./styles.module.css";

const DefaultModal = ({ onChange, color = "purple" }) => {
    return (
        <div
            className={
                color == "purple"
                    ? clsx(styles.modalContainer, styles.background_purple)
                    : clsx(styles.modalContainer, styles.background_red)
            }
            id="defaultModal"
        >
            <div className={styles.modalGrid}>
                <div className={styles.modalItem}>
                    <div
                        className={
                            color == "purple"
                                ? clsx(
                                      styles.modalCross,
                                      styles.modalColor_purple
                                  )
                                : clsx(styles.modalCross, styles.modalColor_red)
                        }
                    >
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
                    <svg
                        viewBox="0 0 11 11"
                        className={
                            color == "purple"
                                ? clsx(styles.cornerTop, styles.corner_purple)
                                : clsx(styles.cornerTop, styles.corner_red)
                        }
                    >
                        <path d="M0.0410737 0H0V11H11V10.9589C5.1702 10.478 0.522022 5.8298 0.0410737 0Z" />
                    </svg>
                </div>
                <div className={styles.modalItem}>
                    <svg
                        viewBox="0 0 11 11"
                        className={
                            color == "purple"
                                ? clsx(
                                      styles.cornerBottom,
                                      styles.corner_purple
                                  )
                                : clsx(styles.cornerBottom, styles.corner_red)
                        }
                    >
                        <path d="M10.9589 11H11V0H0V0.0410738C5.8298 0.522022 10.478 5.1702 10.9589 11Z" />
                    </svg>
                </div>
                <div
                    className={
                        color == "purple"
                            ? clsx(styles.modalBlock, styles.modalColor_purple)
                            : clsx(styles.modalBlock, styles.modalColor_red)
                    }
                >
                    <img
                        className={styles.modalImage}
                        src={color == "purple" ? thinkingEmoji : deadEmoji}
                        alt={"Emoji"}
                    />
                    <div className={styles.modalInfo}>
                        <h2 className={styles.modalHeading}>
                            {color == "purple" ? (
                                <>
                                    Are you sure you
                                    <br /> want to leave?
                                </>
                            ) : (
                                <>
                                    Your crypto-bubble <br /> burst. Start again
                                    <br /> or exit?
                                </>
                            )}
                        </h2>
                        <p
                            className={
                                color == "purple"
                                    ? styles.modalSubheading
                                    : clsx(
                                          styles.modalSubheading,
                                          styles.modalBet
                                      )
                            }
                        >
                            {color == "purple" ? (
                                <>
                                    Your points and money
                                    <br /> will be lost
                                </>
                            ) : (
                                <>
                                    Your Bet:
                                    <span>5 TON</span>
                                </>
                            )}
                        </p>
                    </div>
                    <Button
                        text={"NO"}
                        color={"extraWhite"}
                        className={
                            color == "purple"
                                ? clsx(
                                      styles.modalButton,
                                      styles.modalColor_purple
                                  )
                                : clsx(
                                      styles.modalButton,
                                      styles.modalColor_red
                                  )
                        }
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
                            // stats.style.display = 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DefaultModal;

