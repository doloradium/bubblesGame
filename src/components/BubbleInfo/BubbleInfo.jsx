import React from "react";

import arrows from "../../../public/assets/arrowsTwo.svg";

import Button from "../Button/Button";

import bubble from "../../../public/assets/bubble.png";

import styles from "./styles.module.css";

const BubbleInfo = () => {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoName}>TON</div>
            <img src={bubble} className={styles.infoImage} alt="Bubble" />
            <div className={styles.infoStatistics}>
                <div className={styles.infoBlock}>
                    <span>Strength</span> No Limits
                </div>
                <div className={styles.infoBlock}>
                    <span>Earn</span> 1 life (1% of stake)
                </div>
                <div className={styles.infoBlock}>
                    <span>Modes</span> Free + Pay
                </div>
                <div className={styles.infoPrice}>5 TON</div>
            </div>
        </div>
    );
};

export default BubbleInfo;
