import React from "react";

import Button from "../Button/Button";

import styles from "./styles.module.css";

const RateItem = ({ image, score, users, win }) => {
    return (
        <div className={styles.rateContainer}>
            <img src={image} alt="Avatar" className={styles.rateAvatar} />
            <div className={styles.rateInfo}>
                <div className={styles.rateStatisctics}>
                    <div className={styles.rateItem}>
                        {score}
                        <span>score</span>
                    </div>
                    <div className={styles.rateItem}>
                        {users}
                        <span>users</span>
                    </div>
                    <div className={styles.rateItem}>
                        {win}
                        <span>win (TON)</span>
                    </div>
                </div>
                <Button text={"JOIN THE LEGION"} color={"orange"} />
            </div>
        </div>
    );
};

export default RateItem;
