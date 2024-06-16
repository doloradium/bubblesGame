import React from "react";

import arrows from "../../../public/assets/arrowsTwo.svg";

import userInfo from "../../data/userInfo";

import Button from "../Button/Button";

import styles from "./styles.module.css";

const Header = ({ balance }) => {
    return (
        <div className={styles.headerContainer}>
            <img
                src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${userInfo.telegram_id}`}
                alt="Avatar"
                className={styles.avatar}
            />
            <div className={styles.balanceContainer}>
                My balance <br />
                <span>{0 ?? balance.toFixed(3)} TON</span>
            </div>
            <Button
                color={"green"}
                image={arrows}
                className={styles.redeemButton}
                onClick={() => {
                    let transactions = document.querySelector("#transactions");
                    transactions.style.display = "flex";
                    setTimeout(() => {
                        transactions.style.opacity = 1;
                    }, 100);
                }}
            />
            <Button
                color={"purple"}
                text={"Legion"}
                className={styles.legionButton}
                onClick={() => {
                    let legions = document.querySelector("#legions");
                    legions.style.display = "flex";
                    setTimeout(() => {
                        legions.style.opacity = 1;
                    }, 100);
                }}
            />
        </div>
    );
};

export default Header;

