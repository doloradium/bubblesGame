import React, { useState, useEffect } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import bigTon from "../../../public/assets/bigTon.svg";

const BonusFund = ({ incomingTime }) => {
    const [time, setTime] = useState(incomingTime);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        if (time <= 1) setIsRunning(false);

        return () => clearInterval(interval);
    }, [time]);

    const formatTime = (seconds) => {
        const remainingSeconds = seconds % 60;
        const remainingMinutes =
            Math.floor((seconds - remainingSeconds) / 60) % 60;
        const remainingHours =
            (seconds - remainingSeconds - remainingMinutes * 60) / 3600;
        return `${remainingHours.toString().padStart(2, "0")}:${remainingMinutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

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
            <div className={styles.bonusCounter}>{formatTime(time)}</div>
        </div>
    );
};

export default BonusFund;
