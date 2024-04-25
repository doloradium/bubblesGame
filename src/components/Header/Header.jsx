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
            <Button color={"green"} image={arrows} />
            <Button color={"purple"} text={"Legion"} />
        </div>
    );
};

export default Header;
