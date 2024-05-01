import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import bigTon from "../../../public/assets/bigTon.svg";

const BonusFund = () => {
    return (
        <div className={styles.bonusWrapper}>
            <div className={styles.bonusText}>Weekly bonus fund</div>
            <div className={styles.bonusContainer}>
                <div className={styles.bonusCircle}></div>
                <div
                    className={clsx(styles.bonusCircle, styles.delayOne)}
                ></div>
                <div
                    className={clsx(styles.bonusCircle, styles.delayTwo)}
                ></div>
                <img src={bigTon} alt="TON" className={styles.bonusImage} />
                <div className={styles.bonusAmount}>100,000,000</div>
            </div>
            <div className={styles.bonusCounter}>00:00:23</div>
        </div>
    );
};

export default BonusFund;
