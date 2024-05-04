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

    return (
        <div className={styles.gamemodeContainer}>
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
            <div className={styles.gamemodeBet}>
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
