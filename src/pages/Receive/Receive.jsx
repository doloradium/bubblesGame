import React from "react";
import styles from "./styles.module.css";

import Button from "../../components/Button/Button";

import arrowBack from "../../../public/assets/arrowBack.svg";
import cross from "../../../public/assets/cross.svg";

import qr from "../../../public/assets/qr.png";

const Receive = () => {
    return (
        <div className={styles.transactionsWrapper} id="receive">
            <div className={styles.transactionsContainer}>
                <div className={styles.transactionHeader}>
                    <Button
                        image={arrowBack}
                        className={styles.buttonBack}
                        color={"white"}
                        onClick={() => {
                            let transactions =
                                document.querySelector("#transactions");
                            let receive = document.querySelector("#receive");
                            transactions.style.display = "flex";
                            receive.style.display = "none";
                        }}
                    />
                    <h2 className={styles.receiveHeading}>Receive coin</h2>
                    <Button
                        image={cross}
                        className={styles.buttonClose}
                        color={"purpleTransparent"}
                        onClick={() => {
                            let transactions =
                                document.querySelector("#transactions");
                            let main = document.querySelector("#main");
                            main.style.display = "flex";
                            transactions.style.display = "none";
                        }}
                    />
                </div>
                <div className={styles.receiveBlock}>
                    <div className={styles.receiveText}>Chain type: TON</div>
                    <img src={qr} alt="QR" className={styles.receiveImage} />
                </div>
                <div className={styles.receiveBlock}>
                    <div className={styles.receiveText}>Wallet adress</div>
                    <input
                        type="text"
                        value="1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF"
                        className={styles.receiveInput}
                        readOnly
                    />
                </div>
            </div>
            <div
                className={styles.squadName}
                onClick={() => {
                    let referral = document.querySelector("#referral");
                    referral.style.display = "flex";
                }}
            >
                MY SQUAD
            </div>
        </div>
    );
};

export default Receive;
