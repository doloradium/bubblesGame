import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Button from "../Button/Button";

import styles from "./styles.module.css";

import skull from "../../../public/assets/skull.svg";
import heart from "../../../public/assets/statsHeart.svg";
import star from "../../../public/assets/statsStar.svg";
import crown from "../../../public/assets/statsCrown.svg";
import arrowBack from "../../../public/assets/arrowBack.svg";
import loader from "../../../public/assets/loader.png";
import logo from "../../../public/assets/logo.svg";

import websocketStats from "../../data/websocketStats";

const Stats = () => {
    const [leaderboard, setLeaderboard] = useState(websocketStats.users);
    const [status, setStatus] = useState(websocketStats.status);

    useEffect(() => {}, [leaderboard]);
    setInterval(() => {
        setLeaderboard(websocketStats.users);
        setStatus(websocketStats.status);
    }, 1000);

    return (
        <div
            className={
                status == "ready"
                    ? styles.statsWrapper
                    : clsx(styles.statsWrapper, styles.statsLoading)
            }
            id="stats"
        >
            {status == "loading" ? (
                <>
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
                    <div className={styles.loaderContainer}>
                        <img
                            src={logo}
                            className={styles.logo}
                            alt="Cryptobubble Wras"
                        />
                        <img
                            src={loader}
                            className={styles.loader}
                            alt="Loading..."
                        />
                    </div>
                </>
            ) : (
                <>
                    {" "}
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
                                    src={heart}
                                    alt="Heart"
                                    className={styles.statsImage}
                                />
                                <span>Health:</span>
                                {websocketStats.health}
                            </div>
                            <div className={styles.statsItem}>
                                <img
                                    src={skull}
                                    alt="Skill"
                                    className={styles.statsImage}
                                />
                                <span>Ate lives: </span>
                                {websocketStats.profit}
                            </div>
                            <div className={styles.statsItem}>
                                <img
                                    src={star}
                                    alt="Star"
                                    className={styles.statsImage}
                                />
                                <span>Score: </span>
                                {Math.round(websocketStats.score)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.ratingContainer}>
                        <img
                            src={crown}
                            alt="Crown"
                            className={styles.statsImage}
                        />
                        {leaderboard.map((item, key) => (
                            <div key={key} className={styles.ratingItem}>
                                <div className={styles.ratingName}>
                                    {item.user_id}
                                </div>
                                <span>:</span>
                                <div className={styles.ratingScore}>
                                    {item.size}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Stats;

