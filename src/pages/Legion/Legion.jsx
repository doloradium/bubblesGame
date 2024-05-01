import React from "react";

import styles from "./styles.module.css";
import WeeklyRate from "../../components/WeeklyRate/WeeklyRate";

const Legion = () => {
    return (
        <div className={styles.legionContainer}>
            <WeeklyRate />
        </div>
    );
};

export default Legion;
