import React, { useEffect, useState } from "react";

import Button from "../Button/Button";

import styles from "./styles.module.css";

import coin from "../../../public/assets/statsCoin.svg";
import heart from "../../../public/assets/statsHeart.svg";
import star from "../../../public/assets/statsStar.svg";
import crown from "../../../public/assets/statsCrown.svg";
import arrowBack from "../../../public/assets/arrowBack.svg";

import websocketStats from "../../data/websocketStats";

const Stats = () => {
    const [leaderboard, setLeaderboard] = useState([websocketStats.users]);

    useEffect(() => {
        // setInterval(() => {
        //     setLeaderboard(websocketStats.users);
        // }, 100);
    }, [leaderboard]);
    setInterval(() => {
        setLeaderboard(websocketStats.users);
    }, 1000);

    // console.log(leaderboard);

    return (
        <div className={styles.statsWrapper}>
            <div className={styles.statsLeft}>
                <Button
                    image={arrowBack}
                    className={styles.buttobBack}
                    color={"white"}
                    onClick={() => {
                        let defaultModal =
                            document.querySelector("#defaultModal");
                        defaultModal.style.display = "block";
                        setTimeout(() => {
                            defaultModal.style.opacity = 1;
                        }, 100);
                    }}
                />
                <div className={styles.statsContainer}>
                    <div className={styles.statsItem}>
                        <img
                            src={coin}
                            alt="Coin"
                            className={styles.statsImage}
                        />
                        <span>Health:</span>
                        {websocketStats.health}
                    </div>
                    <div className={styles.statsItem}>
                        <img
                            src={heart}
                            alt="Heart"
                            className={styles.statsImage}
                        />
                        <span>Profit: </span>
                        {websocketStats.profit}
                    </div>
                    <div className={styles.statsItem}>
                        <img
                            src={star}
                            alt="Star"
                            className={styles.statsImage}
                        />
                        <span>Score: </span>
                        {websocketStats.score}
                    </div>
                </div>
            </div>
            <div className={styles.ratingContainer}>
                <img src={crown} alt="Crown" className={styles.statsImage} />
                {leaderboard.map((item, key) => (
                    <div key={key} className={styles.ratingItem}>
                        <span>{item.user_id}: </span>
                        {item.size}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
