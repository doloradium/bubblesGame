import React, { useEffect } from "react";

import styles from "./styles.module.css";

const BubbleInfo = (bubbleData) => {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoName}>{bubbleData.bubbleData.coin}</div>
            <img
                src={bubbleData.bubbleData.image}
                className={styles.infoImage}
                alt="Bubble"
            />
            <div className={styles.infoStatistics}>
                <div className={styles.infoBlock}>
                    <span>Strength</span> {bubbleData.bubbleData.strength}
                </div>
                <div className={styles.infoBlock}>
                    <span>Earn</span> {bubbleData.bubbleData.earn}
                </div>
                <div className={styles.infoBlock}>
                    <span>Modes</span> {bubbleData.bubbleData.modes}
                </div>
                <div className={styles.infoPrice}>
                    {bubbleData.bubbleData.price} TON
                </div>
            </div>
        </div>
    );
};

export default BubbleInfo;
