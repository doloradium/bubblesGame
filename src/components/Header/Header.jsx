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
                    let main = document.querySelector("#main");
                    transactions.style.display = "flex";
                    main.style.display = "none";
                }}
            />
            <Button
                color={"purple"}
                text={"Legion"}
                className={styles.legionButton}
                onClick={() => {
                    let legions = document.querySelector("#legions");
                    let main = document.querySelector("#main");
                    legions.style.display = "flex";
                    main.style.display = "none";
                }}
            />
        </div>
    );
};

export default Header;
