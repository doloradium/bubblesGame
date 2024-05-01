import React from "react";

import Button from "../Button/Button";

import styles from "./styles.module.css";

import legionAvatar from "../../../public/assets/legionAvatar.png";

const RateItem = () => {
    return (
        <div className={styles.rateContainer}>
            <img
                src={legionAvatar}
                alt="Avatar"
                className={styles.rateAvatar}
            />
            <div className={styles.rateInfo}>
                <h2 className={styles.rateHeading}>Weekly Rate</h2>
                <div className={styles.rateStatisctics}>
                    <div className={styles.rateItem}>
                        525,512<span>score</span>
                    </div>
                    <div className={styles.rateItem}>
                        245,056<span>users</span>
                    </div>
                    <div className={styles.rateItem}>
                        23035<span>win (TON)</span>
                    </div>
                </div>
                <Button text={"JOIN THE LEGION"} />
            </div>
        </div>
    );
};

export default RateItem;
