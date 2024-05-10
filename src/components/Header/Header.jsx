import React from "react";

import arrows from "../../../public/assets/arrowsTwo.svg";

import Button from "../Button/Button";

import styles from "./styles.module.css";

const Header = ({ name, balance }) => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.avatar}>{name}</div>
            <div className={styles.balanceContainer}>
                My balance <br />
                <span>{balance}</span>
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
