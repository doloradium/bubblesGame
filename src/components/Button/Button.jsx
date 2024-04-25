import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

const Button = ({ text, color, image, className, onClick }) => {
    return (
        <>
            <button
                onClick={onClick}
                className={clsx([styles.button, styles[color], className])}
            >
                {text}
                {image != null ? <img src={image} /> : null}
            </button>
        </>
    );
};

export default Button;
