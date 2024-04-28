import React from "react";

import arrowBack from "../../../public/assets/arrowBack.svg";

import styles from "./styles.module.css";
import ChooseBubble from "../../components/ChooseBubble/ChooseBubble";
import Button from "../../components/Button/Button";
import BubbleInfo from "../../components/BubbleInfo/BubbleInfo";

const BubblesShop = () => {
    return (
        <div className={styles.shopContainer} id="bubbles-shop">
            <Button
                image={arrowBack}
                className={styles.buttonBack}
                onClick={() => {
                    let bubblesShop = document.querySelector("#bubbles-shop");
                    let setup = document.querySelector("#setup");
                    bubblesShop.style.display = "none";
                    setup.style.display = "flex";
                }}
            />
            <div className={styles.shopType}>
                <div className={styles.shopItem}>Bubbles</div>
                <div className={styles.shopItem}>Boosts</div>
            </div>
            <div className={styles.shopBlock}>
                <div className={styles.shopBackground}></div>
                <BubbleInfo />
                <ChooseBubble noBackground noTitle />
                <div className={styles.purchaseInfo}>
                    Chosen Items<span>1</span>
                </div>
                <div className={styles.purchaseInfo}>
                    Total price<span>5 TON</span>
                </div>
                <Button color={"purple"} text={"BUY BUBBLES"} />
            </div>
        </div>
    );
};

export default BubblesShop;
