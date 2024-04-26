import React from "react";

import Button from "../../components/Button/Button";
import cart from "../../../public/assets/cart.svg";

import styles from "./styles.module.css";
import GameMode from "../../components/GameMode/GameMode";
import ChooseBubble from "../../components/ChooseBubble/ChooseBubble";

const Setup = () => {
    return (
        <>
            <div className={styles.pageContainer} id="setup">
                <ChooseBubble />
                <GameMode />
                <Button text={"BUY MORE BUBBLES"} image={cart} color={"blue"} />
                <Button
                    color={"blue"}
                    text={"START GAME"}
                    onClick={() => {
                        let app = document.querySelector("#app");
                        let setup = document.querySelector("#setup");
                        app.style.display = "block";
                        setup.style.display = "none";
                    }}
                />
            </div>
        </>
    );
};

export default Setup;
