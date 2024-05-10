import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import Button from "../Button/Button";

import coin from "../../../public/assets/coin.svg";
import hodl from "../../../public/assets/hodl.svg";
import star from "../../../public/assets/star.svg";
import arrowBack from "../../../public/assets/arrowBack.svg";

const ModalHODL = () => {
    return (
        <div className={styles.modalWrapper} id="modal-hodl">
            <div className={styles.modalContainer}>
                <Button
                    color={"white"}
                    className={styles.backButton}
                    image={arrowBack}
                    onClick={() => {
                        let modal = document.querySelector("#modal-hodl");
                        modal.style.opacity = 0;
                        setTimeout(() => {
                            modal.style.display = "none";
                        }, 100);
                    }}
                />
                <h2 className={styles.modalHeading}>Save Mode</h2>
                <div className={styles.modalBody}>
                    <div className={styles.hodlContainer}>
                        <div
                            className={clsx(styles.hodlCircle, styles.delayOne)}
                        ></div>
                        <div
                            className={clsx(styles.hodlCircle, styles.delayTwo)}
                        ></div>
                        <div className={styles.hodlCircle}></div>
                        <img
                            src={hodl}
                            alt="Shield"
                            className={styles.hodlImage}
                        />
                    </div>
                    <div className={styles.modalInfo}>
                        <img
                            src={coin}
                            alt="Coin"
                            className={styles.modalIcon}
                        />
                        <div className={styles.modalText}>
                            <span>Your Profit: </span>5 TON
                        </div>
                    </div>
                    <div className={styles.modalInfo}>
                        <img
                            src={star}
                            alt="Star"
                            className={styles.modalIcon}
                        />
                        <div className={styles.modalText}>
                            <span>Your Score: </span>86
                        </div>
                    </div>
                    <Button
                        text="SAVE THE GAME"
                        color="denseGreen"
                        onClick={() => {
                            let modal = document.querySelector("#modal-hodl");
                            modal.style.opacity = 0;
                            setTimeout(() => {
                                modal.style.display = "none";
                            }, 100);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalHODL;
