import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useSound from "use-sound";

import click from "../../../public/sounds/button.mp3";

import CheckBox from "../CheckBox/CheckBox";

import styles from "./styles.module.css";
import websocketStats from "../../data/websocketStats";

const GameMode = ({ changeBet, newBet }) => {
    const [mode, setMode] = useState("pay");
    const [counter, setCounter] = useState("");

    const [play] = useSound(click);

    const handleChange = (e) => {
        // if (e.target.value.match(/^\d+$/)) {
        //     setCounter(+e.target.value);
        //     // setBet(e.target.value);
        //     websocketStats.bet = +e.target.value;
        // }
        if (e.target.value.match(/^\d+\.?\d?$/)) {
            setCounter(e.target.value);
            // setBet(e.target.value);
            websocketStats.bet = +e.target.value;
        }
        if (e.target.value.length == 0) {
            // changeBet(0);
            setCounter("");
            websocketStats.bet = 0;
        }
    };

    return (
        <div className={styles.gamemodeContainer}>
            <h2 className={styles.gamemodeHeading}>GAME MODE</h2>
            <div className={styles.gamemodeSelection}>
                <div
                    className={styles.gamemodeOptions}
                    onClick={() => {
                        mode == "pay" ? setMode("free") : null;
                        play();
                    }}
                >
                    <div className={styles.gamemodeName}>FREE</div>
                    <CheckBox isChecked={mode == "free"} />
                </div>
                <div
                    className={styles.gamemodeOptions}
                    onClick={() => {
                        mode == "free" ? setMode("pay") : null;
                        play();
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
                            if (newBet > 0) {
                                // setCounter(+(newBet - 0.1).toFixed(1));
                                // setBet(+(newBet - 0.1).toFixed(1));
                                changeBet(+(newBet - 0.1).toFixed(1));
                                websocketStats.bet = +(newBet - 0.1).toFixed(1);
                            }
                            play();
                        }}
                    >
                        -
                    </div>
                    <input
                        className={styles.counterItem}
                        value={counter}
                        onChange={handleChange}
                        placeholder="0"
                    />
                    <div
                        className={styles.counterItem}
                        onClick={() => {
                            // setCounter(+(newBet + 0.1).toFixed(1));
                            changeBet(+(newBet + 0.1).toFixed(1));
                            // setBet(+(newBet + 0.1).toFixed(1));
                            websocketStats.bet = +(newBet + 0.1).toFixed(1);
                            play();
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

