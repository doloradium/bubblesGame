import React, { useState, useEffect } from "react";

import styles from "./styles.module.css";

const InfoModal = ({ modalState, earn }) => {
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
                <span>Earn</span>
                Eating foe's life yields {earn}% of their stake
            </div>
        </div>
    );
};

export default InfoModal;

