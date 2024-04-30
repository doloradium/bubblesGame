import React from "react";
import styles from "./styles.module.css";

import Button from "../../components/Button/Button";

import arrowBack from "../../../public/assets/arrowBack.svg";
import cross from "../../../public/assets/cross.svg";

const Send = () => {
    return (
        <div className={styles.transactionsWrapper} id="send">
            <div className={styles.transactionsContainer}>
                <div className={styles.transactionHeader}>
                    <Button
                        image={arrowBack}
                        className={styles.buttonBack}
                        onClick={() => {
                            let transactions =
                                document.querySelector("#transactions");
                            let send = document.querySelector("#send");
                            transactions.style.display = "flex";
                            send.style.display = "none";
                        }}
                    />
                    <h2 className={styles.sendHeading}>Send coin</h2>
                    <Button
                        image={cross}
                        className={styles.buttonClose}
                        onClick={() => {
                            let transactions =
                                document.querySelector("#transactions");
                            let main = document.querySelector("#main");
                            main.style.display = "flex";
                            transactions.style.display = "none";
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
                    <Button text={"WITHDRAW"} color="white" />
                    <p className={styles.sendParagraph}>
                        We print only on wallets without memo, be careful!
                        Change wallet only through a support.
                    </p>
                </div>
            </div>
            <div className={styles.squadName}>MY SQUAD</div>
        </div>
    );
};

export default Send;
