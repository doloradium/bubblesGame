import React, { useState } from "react";

import styles from "./styles.module.css";

import check from "../../../public/assets/check.svg";

const CheckBox = ({ isChecked, onClick }) => {
    return (
        <>
            <div
                className={
                    isChecked == true
                        ? styles.checkboxActive
                        : styles.checkboxInactive
                }
                onClick={onClick}
            >
                {isChecked == true ? <img src={check} alt="Check" /> : null}
            </div>
        </>
    );
};

export default CheckBox;
