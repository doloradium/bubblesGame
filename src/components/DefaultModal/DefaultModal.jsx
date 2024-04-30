import React from "react";

import arrows from "../../../public/assets/arrowsTwo.svg";

import Button from "../Button/Button";

import styles from "./styles.module.css";

const DefaultModal = ({ name, balance }) => {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalGrid}>
                <div className={styles.modalCross}></div>
                <div className={styles.modalCorner1}></div>
                <div className={styles.modalCorner2}></div>
                <div className={styles.modalBlock}></div>
            </div>
        </div>
    );
};

export default DefaultModal;
