import React from "react";

import WeeklyRate from "../../components/WeeklyRate/WeeklyRate";
import BonusFund from "../../components/BonusFund/BonusFund";
import WeeklyResults from "../../components/WeeklyResults/WeeklyResults";
import Button from "../../components/Button/Button";

import styles from "./styles.module.css";

import arrowBack from "../../../public/assets/arrowBack.svg";

const Legion = () => {
    return (
        <div className={styles.legionContainer} id="legions">
            <h2 className={styles.legionHeading}>Legion</h2>
            <Button
                image={arrowBack}
                className={styles.buttonBack}
                color={"white"}
                onClick={() => {
                    let legions = document.querySelector("#legions");
                    legions.style.opacity = 0;
                    setTimeout(() => {
                        legions.style.display = "none";
                    }, 100);
                }}
            />
            <WeeklyRate />
            <BonusFund incomingTime={5304} />
            <WeeklyResults />
        </div>
    );
};

export default Legion;
