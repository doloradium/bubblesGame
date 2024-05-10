import React from "react";

import Button from "../Button/Button";

import styles from "./styles.module.css";

import startup from "../../../public/assets/modal.png";

const StartupModal = () => {
    return (
        <div className={styles.startupWrapper} id="startupContainer">
            <div className={styles.startupContainer}>
                <img
                    className={styles.startupImage}
                    src={startup}
                    alt="Startup"
                />
                <Button
                    className={styles.startupButton}
                    color={"orange"}
                    text={"TAKE GIFT"}
                    onClick={() => {
                        let modal = document.querySelector("#startupContainer");
                        modal.style.opacity = 0;
                        setTimeout(() => {
                            modal.style.display = "none";
                        }, 100);
                    }}
                />
            </div>
        </div>
    );
};

export default StartupModal;
