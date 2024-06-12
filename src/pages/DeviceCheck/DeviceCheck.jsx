import React from "react";
import clsx from "clsx";

import redirect from "../../../public/assets/redirect.png";

import styles from "./styles.module.css";

import Button from "../../components/Button/Button";

const DeviceCheck = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.redirectHeading}>
                Best experienced on mobile. Play on your phone
            </h1>
            <div className={styles.redirectContainer}>
                <img
                    src={redirect}
                    alt="Qr Code"
                    className={styles.redirectCode}
                />
            </div>
            <div className={styles.redirectButtons}>
                <a
                    className={clsx(styles.link, styles.orange)}
                    href="https://t.me/crypto_bubble_wars"
                    target="_blank"
                >
                    Official TG Channel
                </a>
                <a
                    className={clsx(styles.link, styles.denseGreen)}
                    href="https://t.me/panamera_game_dev"
                    target="_blank"
                >
                    TG Channel CEO
                </a>
                <a
                    className={clsx(styles.link, styles.purple)}
                    href="https://x.com/vlad_panamera"
                    target="_blank"
                >
                    X CEO
                </a>
            </div>
        </div>
    );
};

export default DeviceCheck;

