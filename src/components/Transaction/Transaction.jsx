import React from "react";

import styles from "./styles.module.css";

import incoming from "../../../public/assets/incoming.svg";
import outcoming from "../../../public/assets/outcoming.svg";

const Transaction = ({ image, name, amount, date, direction }) => {
    return (
        <div className={styles.transactionContainer}>
            <div className={styles.transactionInfo}>
                <img src={image} alt="Coin name" />
                {name}
            </div>
            <div className={styles.transactionInfo}>{amount}</div>
            {direction == "in" ? (
                <img src={incoming} alt="Incoming" />
            ) : (
                <img src={outcoming} alt="Incoming" />
            )}
            <div className={styles.transactionInfo}>{date}</div>
        </div>
    );
};

export default Transaction;
