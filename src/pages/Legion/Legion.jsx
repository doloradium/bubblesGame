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
            <Button
                image={arrowBack}
                className={styles.buttonBack}
                onClick={() => {
                    let legions = document.querySelector("#legions");
                    let main = document.querySelector("#main");
                    legions.style.display = "none";
                    main.style.display = "flex";
                }}
            />
            <WeeklyRate />
            <BonusFund incomingTime={5304} />
            <WeeklyResults />
        </div>
    );
};

export default Legion;
