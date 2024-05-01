import React from "react";

import clanTag from "../../../public/assets/clanTag.svg";

import styles from "./styles.module.css";

const WeeklyResults = () => {
    return (
        <div className={styles.resultsContainer}>
            <div className={styles.resultsToggle}>Weekly | Daily</div>
            <div className={styles.resultsBlock}>
                <div className={styles.resultProfile}>
                    <div className={styles.resultsUser}>VP</div>
                    <img
                        src={clanTag}
                        alt="Clan"
                        className={styles.resultsClan}
                    />
                </div>
                <div className={styles.resultsStatistics}>
                    <div className={styles.resultsItem}>
                        45,151<span>score</span>
                    </div>
                    <div className={styles.resultsItem}>
                        151<span>bet (TON)</span>
                    </div>
                    <div className={styles.resultsItem}>
                        +2<span>earn (TON)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyResults;
