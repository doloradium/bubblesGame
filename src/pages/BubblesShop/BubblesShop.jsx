import React, { useState, useEffect } from "react";

import arrowBack from "../../../public/assets/arrowBack.svg";

import styles from "./styles.module.css";
import ChooseBubble from "../../components/ChooseBubble/ChooseBubble";
import Button from "../../components/Button/Button";
import BubbleInfo from "../../components/BubbleInfo/BubbleInfo";

import data from "../../data/data";

const BubblesShop = () => {
    const [bubbles, setBubbles] = useState([]);
    const [dataInfo, setdataInfo] = useState(data);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let innerPrice = 0;
        bubbles.forEach((item) => {
            innerPrice += +data[item].price;
        });
        setTotalPrice(innerPrice);
    }, [bubbles]);

    return (
        <div className={styles.shopContainer} id="bubbles-shop">
            <Button
                image={arrowBack}
                className={styles.buttonBack}
                color={"white"}
                onClick={() => {
                    let bubblesShop = document.querySelector("#bubbles-shop");
                    bubblesShop.style.opacity = 0;
                    setTimeout(() => {
                        bubblesShop.style.display = "none";
                    }, 100);
                }}
            />
            <h2 className={styles.shopHeading}>Shop</h2>
            <div className={styles.shopBlock}>
                <div className={styles.shopBackground}></div>
                <BubbleInfo
                    bubbleData={
                        bubbles.length == 0
                            ? data[0]
                            : data[bubbles[bubbles.length - 1]]
                    }
                />
                <ChooseBubble
                    dataInfo={dataInfo}
                    handleChange={setBubbles}
                    noBackground
                    noTitle
                    multipleChoice
                />
                <div className={styles.purchaseInfo}>
                    Chosen Items<span>{bubbles.length}</span>
                </div>
                <div className={styles.purchaseInfo}>
                    Total price
                    <span>{totalPrice} TON</span>
                </div>
                <Button color={"purple"} text={"BUY BUBBLES"} />
            </div>
        </div>
    );
};

export default BubblesShop;
