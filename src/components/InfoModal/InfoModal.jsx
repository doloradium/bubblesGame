import React, { useState, useEffect } from "react";

import styles from "./styles.module.css";

const InfoModal = ({ modalState, strength, earn, modes }) => {
    const [innerModalState, setInnerModalState] = useState(modalState);

    useEffect(() => {
        setInnerModalState(modalState);
    }, [modalState]);

    return (
        <div
            className={
                innerModalState == 1 ? styles.modalContainer : styles.invisible
            }
        >
            <div className={styles.modalBlock}>
                <span>Strength</span>
                {strength}
            </div>
            <div className={styles.modalBlock}>
                <span>Earn</span>
                {earn}
            </div>
            <div className={styles.modalBlock}>
                <span>Modes</span>
                {modes}
            </div>
        </div>
    );
};

export default InfoModal;
