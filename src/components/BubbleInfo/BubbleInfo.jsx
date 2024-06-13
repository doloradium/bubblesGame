import React from "react";

import styles from "./styles.module.css";

import bubbles from "../../data/bubbles";

const BubbleInfo = ({ bubbleList, bubbleNumber }) => {
    let result = [{ Cost: 0 }];
    if (bubbleList) {
        result = bubbleList.filter((item) => item.ID == bubbleNumber);
    }

    return (
        <div className={styles.infoContainer}>
            <img
                src={bubbles[bubbleNumber - 1].image}
                className={styles.infoImage}
                alt="Bubble"
            />
            <div className={styles.infoStatistics}>
                <div className={styles.infoName}>{result[0].Name}</div>
                <div className={styles.infoBlock}>
                    <span>Earn</span>
                    {result[0].Earn}% of the stake
                </div>
                <div className={styles.infoPrice}>{result[0].Cost} TON</div>
            </div>
        </div>
    );
};

export default BubbleInfo;

