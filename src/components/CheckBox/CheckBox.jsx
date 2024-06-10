import React from "react";
import clsx from "clsx";
import useSound from "use-sound";

import click from "../../../public/sounds/button.mp3";

import styles from "./styles.module.css";

import check from "../../../public/assets/check.svg";

const CheckBox = ({ isChecked, onClick, className }) => {
    const [play] = useSound(click);

    return (
        <>
            <div
                className={clsx(
                    className,
                    isChecked == true
                        ? styles.checkboxActive
                        : styles.checkboxInactive
                )}
                onClick={() => {
                    onClick;
                    play();
                }}
            >
                {isChecked == true ? <img src={check} alt="Check" /> : null}
            </div>
        </>
    );
};

export default CheckBox;

