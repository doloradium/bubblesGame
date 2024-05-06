import React, { useState } from "react";

import clanTag from "../../../public/assets/clanTag.svg";

import styles from "./styles.module.css";

const WeeklyResults = () => {
    const [period, setPeriod] = useState("weekly");

    return (
        <div className={styles.resultsContainer}>
            <div className={styles.resultsToggle}>
                <div
                    className={period == "weekly" ? styles.toggleItem : null}
                    onClick={() => {
                        setPeriod("weekly");
                    }}
                >
                    Weekly
                </div>{" "}
                |{" "}
                <div
                    className={period == "daily" ? styles.toggleItem : null}
                    onClick={() => {
                        setPeriod("daily");
                    }}
                >
                    Daily
                </div>{" "}
            </div>
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
                        {period == "weekly" ? "45,151" : "34,345"}
                        <span>score</span>
                    </div>
                    <div className={styles.resultsItem}>
                        {period == "weekly" ? "151" : "345"}
                        <span>bet (TON)</span>
                    </div>
                    <div className={styles.resultsItem}>
                        {period == "weekly" ? "+2" : "+10"}
                        <span>earn (TON)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyResults;
