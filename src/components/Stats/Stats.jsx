import React from "react";

import Button from "../Button/Button";

import styles from "./styles.module.css";

import coin from "../../../public/assets/statsCoin.svg";
import heart from "../../../public/assets/statsHeart.svg";
import star from "../../../public/assets/statsStar.svg";
import crown from "../../../public/assets/statsCrown.svg";
import arrowBack from "../../../public/assets/arrowBack.svg";

import websocket from "../../data/websocket";

const Stats = () => {
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
                    }}
                />
                <div className={styles.statsAvatar}>VP</div>
                <div className={styles.statsContainer}>
                    <div className={styles.statsItem}>
                        <img
                            src={coin}
                            alt="Coin"
                            className={styles.statsImage}
                        />
                        <span>Health:</span>
                        {websocket.health}
                    </div>
                    <div className={styles.statsItem}>
                        <img
                            src={heart}
                            alt="Heart"
                            className={styles.statsImage}
                        />
                        <span>Profit: </span>
                        {websocket.profit}
                    </div>
                    <div className={styles.statsItem}>
                        <img
                            src={star}
                            alt="Star"
                            className={styles.statsImage}
                        />
                        <span>Score: </span>
                        {websocket.score}
                    </div>
                </div>
            </div>
            <div className={styles.ratingContainer}>
                <img src={crown} alt="Crown" className={styles.statsImage} />
                {websocket.users.map((item) => (
                    <>
                        <div className={styles.ratingItem}>
                            <span>{item.name}: </span>
                            {item.score}
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default Stats;
