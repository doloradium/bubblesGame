import React from "react";

import styles from "./styles.module.css";

const ListItem = ({ avatar, name, description }) => {
    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemAvatar}>{avatar}</div>
            <div className={styles.itemDescription}>
                <div className={styles.itemName}>{name}</div>
                <div className={styles.itemDescription}>{description}</div>
            </div>
        </div>
    );
};

export default ListItem;
