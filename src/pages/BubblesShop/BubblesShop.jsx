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
                color={"white"}
                onClick={() => {
                    let bubblesShop = document.querySelector("#bubbles-shop");
                    bubblesShop.style.display = "none";
                }}
            />
            <h2 className={styles.shopHeading}>Shop</h2>
            <div className={styles.shopBlock}>
                <div className={styles.shopBackground}></div>
                <BubbleInfo />
                <ChooseBubble noBackground noTitle multipleChoice />
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
