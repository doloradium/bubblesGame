import React from "react";

import WeeklyRate from "../../components/WeeklyRate/WeeklyRate";
import BonusFund from "../../components/BonusFund/BonusFund";
import WeeklyResults from "../../components/WeeklyResults/WeeklyResults";

import styles from "./styles.module.css";

const Legion = () => {
    return (
        <div className={styles.legionContainer}>
            <WeeklyRate />
            <BonusFund incomingTime={5304} />
            <WeeklyResults />
        </div>
    );
};

export default Legion;
