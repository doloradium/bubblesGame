import React, { useState } from "react";

import CheckBox from "../CheckBox/CheckBox";

import styles from "./styles.module.css";

const GameMode = () => {
    const [counter, setCounter] = useState(0);
    const [mode, setMode] = useState("pay");

    const handleChange = (e) => {
        console.log(e.target.value);
        setCounter(e.target.value);
    };

    const handleClick = () => {
        mode == "pay" ? setMode("free") : setMode("pay");
    };

    return (
        <div className={styles.gamemodeContainer}>
            <h2 className={styles.gamemodeHeading}>GAME MODE</h2>
            <div className={styles.gamemodeSelection}>
                <div className={styles.gamemodeOptions}>
                    <div className={styles.gamemodeName}>FREE</div>
                    <CheckBox
                        onClick={handleClick}
                        isChecked={mode == "free"}
                    />
                </div>
                <div className={styles.gamemodeOptions}>
                    <div className={styles.gamemodeName}>PAY</div>
                    <CheckBox onClick={handleClick} isChecked={mode == "pay"} />
                </div>
            </div>
            <div className={styles.gamemodeBet}>
                <h2 className={styles.gamemodeHeading}>YOUR BET</h2>
                <div className={styles.gamemodeInfo}>
                    <span>My Balance</span> 100 TON
                </div>
                <div className={styles.counter}>
                    <div
                        className={styles.counterItem}
                        onClick={() => {
                            setCounter(counter - 1);
                        }}
                    >
                        -
                    </div>
                    <input
                        className={styles.counterItem}
                        value={counter}
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
