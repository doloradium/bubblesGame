import React from "react";
import styles from "./styles.module.css";
import useSound from "use-sound";

import click from "../../../public/sounds/button.mp3";

import Button from "../../components/Button/Button";

import arrowBack from "../../../public/assets/arrowBack.svg";
import cross from "../../../public/assets/cross.svg";

const Send = () => {
    const [play] = useSound(click);

    return (
        <div className={styles.transactionsWrapper} id="send">
            <div className={styles.transactionsContainer}>
                <div className={styles.transactionHeader}>
                    <Button
                        image={arrowBack}
                        className={styles.buttonBack}
                        color={"white"}
                        onClick={() => {
                            let send = document.querySelector("#send");
                            send.style.opacity = 0;
                            setTimeout(() => {
                                send.style.display = "none";
                            }, 100);
                        }}
                    />
                    <h2 className={styles.sendHeading}>Send coin</h2>
                    <Button
                        image={cross}
                        className={styles.buttonClose}
                        color={"purpleTransparent"}
                        onClick={() => {
                            let send = document.querySelector("#send");
                            let transactions =
                                document.querySelector("#transactions");
                            send.style.opacity = 0;
                            transactions.style.display = "none";
                            setTimeout(() => {
                                send.style.display = "none";
                            }, 100);
                        }}
                    />
                </div>
                <div className={styles.sendBlock}>
                    <div className={styles.sendForm}>
                        <div className={styles.sendItem}>
                            Amount <span>2,570.323 TON</span>
                        </div>
                        <div className={styles.sendInput}>
                            <input
                                type="text"
                                className={styles.inputExtra}
                                placeholder="min: 1 TON"
                            />
                            <Button
                                text={"All"}
                                color={"transparent"}
                                className={styles.inputButton}
                            />
                        </div>
                    </div>
                    <div className={styles.sendForm}>
                        <div className={styles.sendItem}>
                            Wallet adress <span>Add</span>
                        </div>
                        <input
                            readOnly
                            type="text"
                            className={styles.inputSingle}
                            value={"ar235sxnca1829ec193e260a5400ds54xdjfaq1a82"}
                        />
                    </div>
                </div>
                <div className={styles.sendBlock}>
                    <div className={styles.sendItem}>
                        TransactionFee <span>0.3%</span>
                    </div>
                    <div className={styles.sendItem}>
                        Amount received <span>0 TON</span>
                    </div>
                </div>
                <div className={styles.sendBlock}>
                    <Button text={"WITHDRAW"} color={"white"} />
                    <p className={styles.sendParagraph}>
                        We print only on wallets without memo, be careful!
                        Change wallet only through a support.
                    </p>
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

export default Send;

