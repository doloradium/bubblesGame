import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import check from "../../../public/assets/check.svg";

const CheckBox = ({ isChecked, onClick, className }) => {
    return (
        <>
            <div
                className={clsx(
                    className,
                    isChecked == true
                        ? styles.checkboxActive
                        : styles.checkboxInactive
                )}
                onClick={onClick}
            >
                {isChecked == true ? <img src={check} alt="Check" /> : null}
            </div>
        </>
    );
};

export default CheckBox;
