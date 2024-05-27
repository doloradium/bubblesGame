import React from "react";

import styles from "./styles.module.css";

const SquadItem = ({ images, amount, text }) => {
    return (
        <div className={styles.squadContainer}>
            <div className={styles.imageList}>
                {images.map((item, key) => (
                    <img
                        key={key}
                        src={item}
                        alt="Avatar"
                        className={styles.imageItem}
                    />
                ))}
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.infoAmount}>{amount}</div>
                <div className={styles.infoText}>{text}</div>
            </div>
        </div>
    );
};

export default SquadItem;

