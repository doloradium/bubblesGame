import React from "react";

import clanTag from "../../../public/assets/clanTag.svg";

import styles from "./styles.module.css";

const ReferralProfile = () => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.avatarContainer}>
                <div className={styles.avatarImage}>VP</div>
                <div className={styles.avatarCounter}>86</div>
                <img
                    src={clanTag}
                    alt="Legion"
                    className={styles.avatarLegion}
                />
            </div>
            <div className={styles.infoContainer}>
                <h2 className={styles.infoName}>Name of Squad</h2>
                <div className={styles.statsContainer}>
                    <div className={styles.statsItem}>
                        <span>Bubbles</span>86
                    </div>
                    <div className={styles.statsItem}>
                        <span>Score</span>130,255
                    </div>
                    <div className={styles.statsItem}>
                        <span>My Earn</span>130,255 TON
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralProfile;
