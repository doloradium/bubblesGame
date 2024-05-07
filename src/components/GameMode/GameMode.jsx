import React, { useState } from "react";
import clsx from "clsx";

import CheckBox from "../CheckBox/CheckBox";

import styles from "./styles.module.css";

const GameMode = () => {
    const [counter, setCounter] = useState(0);
    const [mode, setMode] = useState("pay");

    const handleChange = (e) => {
        e.target.value.match(/^[0-9]+$/) ? setCounter(e.target.value) : null;
        e.target.value.length == 0 ? setCounter(0) : null;
    };

    return (
        <div className={styles.gamemodeContainer}>
            <h2 className={styles.gamemodeHeading}>GAME MODE</h2>
            <div className={styles.gamemodeSelection}>
                <div
                    className={styles.gamemodeOptions}
                    onClick={() => {
                        mode == "pay" ? setMode("free") : null;
                    }}
                >
                    <div className={styles.gamemodeName}>FREE</div>
                    <CheckBox isChecked={mode == "free"} />
                </div>
                <div
                    className={styles.gamemodeOptions}
                    onClick={() => {
                        mode == "free" ? setMode("pay") : null;
                    }}
                >
                    <div className={styles.gamemodeName}>PAY</div>
                    <CheckBox isChecked={mode == "pay"} />
                </div>
            </div>
            <div
                className={
                    mode == "pay"
                        ? styles.gamemodeBet
                        : clsx(styles.gamemodeBet, styles.inactive)
                }
            >
                <h2 className={styles.gamemodeHeading}>YOUR BET</h2>
                <div className={styles.gamemodeInfo}>
                    <span>My Balance</span> 100 TON
                </div>
                <div className={styles.counter}>
                    <div
                        className={styles.counterItem}
                        onClick={() => {
                            counter > 0 ? setCounter(counter - 1) : null;
                        }}
                    >
                        -
                    </div>
                    <input
                        className={styles.counterItem}
                        value={+counter}
                        onChange={handleChange}
                    />
                    <div
                        className={styles.counterItem}
                        onClick={() => {
                            setCounter(counter + 1);
                        }}
                    >
                        +
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameMode;
