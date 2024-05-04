import React from "react";

import Button from "../../components/Button/Button";
import cart from "../../../public/assets/cart.svg";
import arrowBack from "../../../public/assets/arrowBack.svg";

import styles from "./styles.module.css";
import GameMode from "../../components/GameMode/GameMode";
import ChooseBubble from "../../components/ChooseBubble/ChooseBubble";

const Setup = () => {
    return (
        <>
            <div className={styles.pageContainer} id="setup">
                <h2 className={styles.setupHeading}>Setup</h2>
                <Button
                    image={arrowBack}
                    className={styles.buttonBack}
                    color={"white"}
                    onClick={() => {
                        let setup = document.querySelector("#setup");
                        let main = document.querySelector("#main");
                        setup.style.display = "none";
                        main.style.display = "flex";
                    }}
                />
                <ChooseBubble />
                <GameMode />
                <Button
                    text={"BUY MORE BUBBLES"}
                    image={cart}
                    color={"white"}
                    onClick={() => {
                        let bubblesShop =
                            document.querySelector("#bubbles-shop");
                        let setup = document.querySelector("#setup");
                        bubblesShop.style.display = "grid";
                        // setup.style.display = "none";
                    }}
                />
                <Button
                    color={"white"}
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
