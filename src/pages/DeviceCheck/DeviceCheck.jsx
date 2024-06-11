import React from "react";

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
                <Button
                    onClick={() => {
                        location.href = "https://t.me/crypto_bubble_wars ";
                    }}
                    color={"orange"}
                    text={"Official TG Channel"}
                />
                <Button
                    onClick={() => {
                        location.href = "https://t.me/panamera_game_dev";
                    }}
                    color={"denseGreen"}
                    text={"TG Channel CEO"}
                />
                <Button
                    onClick={() => {
                        location.href = "https://x.com/vlad_panamera ";
                    }}
                    color={"purple"}
                    text={"X CEO"}
                />
            </div>
        </div>
    );
};

export default DeviceCheck;

