import React from "react";
import useSound from "use-sound";
import clsx from "clsx";

import click from "../../../public/sounds/button.mp3";

import styles from "./styles.module.css";

const Button = ({ text, color, image, className, onClick }) => {
    const [play] = useSound(click);

    return (
        <>
            <button
                onClick={() => {
                    play();
                    onClick();
                }}
                className={clsx([styles.button, styles[color], className])}
            >
                {text}
                {image != null ? <img src={image} /> : null}
            </button>
        </>
    );
};

export default Button;

