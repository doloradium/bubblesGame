import React, { useEffect } from "react";
import styles from "./styles.module.css";
import useSound from "use-sound";

import userInfo from "../../data/userInfo";

import click from "../../../public/sounds/button.mp3";

import Button from "../../components/Button/Button";

import arrowBack from "../../../public/assets/arrowBack.svg";
import cross from "../../../public/assets/cross.svg";

const Receive = () => {
    const [play] = useSound(click);

    return (
        <div className={styles.transactionsWrapper} id="receive">
            <div className={styles.transactionsContainer}>
                <div className={styles.transactionHeader}>
                    <Button
                        image={arrowBack}
                        className={styles.buttonBack}
                        color={"white"}
                        onClick={() => {
                            let receive = document.querySelector("#receive");
                            receive.style.opacity = 0;
                            setTimeout(() => {
                                receive.style.display = "none";
                            }, 100);
                        }}
                    />
                    <h2 className={styles.receiveHeading}>Receive coin</h2>
                    <Button
                        image={cross}
                        className={styles.buttonClose}
                        color={"purpleTransparent"}
                        onClick={() => {
                            let receive = document.querySelector("#receive");
                            let transactions =
                                document.querySelector("#transactions");
                            receive.style.opacity = 0;
                            transactions.style.display = "none";
                            setTimeout(() => {
                                receive.style.display = "none";
                            }, 100);
                        }}
                    />
                </div>
                <div className={styles.receiveBlock} id="append">
                    <div className={styles.receiveText}>Chain type: TON</div>
                    <img
                        src={`http://qrcoder.ru/code/?${userInfo.wallet}&10&0`}
                        alt="QR"
                        className={styles.receiveImage}
                    />
                </div>
                <div className={styles.receiveBlock}>
                    <div className={styles.receiveText}>Wallet adress</div>
                    <input
                        type="text"
                        value={userInfo.wallet}
                        className={styles.receiveInput}
                        readOnly
                    />
                </div>
            </div>
            <div
                className={styles.squadName}
                onClick={() => {
                    play();
                    let referral = document.querySelector("#referral");
                    referral.style.display = "flex";
                    setTimeout(() => {
                        referral.style.opacity = 1;
                    }, 100);
                }}
            >
                MY SQUAD
            </div>
        </div>
    );
};

export default Receive;

