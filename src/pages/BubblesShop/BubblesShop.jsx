import React, { useState, useEffect } from "react";

import arrowBack from "../../../public/assets/arrowBack.svg";

import { useFetch } from "../../hooks/useFetch";
import { getBubbles, buyBubbles } from "../../api/apiBubbles";

import styles from "./styles.module.css";
import ChooseBubble from "../../components/ChooseBubble/ChooseBubble";
import Button from "../../components/Button/Button";
import BubbleInfo from "../../components/BubbleInfo/BubbleInfo";

const BubblesShop = () => {
    const [bubbles, setBubbles] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [myBubbles, setMyBubbles] = useState([]);

    let dataBubbles = useFetch(getBubbles).data;

    useEffect(() => {
        getBubbles().then((value) => {
            setMyBubbles([...value.my]);
        });

        let innerPrice = 0;

        bubbles.forEach((item) => {
            if (dataBubbles) {
                let result = dataBubbles.bubbles.filter(
                    (serverItem) => serverItem.ID == item
                );
                innerPrice += result[0].Cost;
            }
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
                    bubbleList={dataBubbles?.bubbles}
                    bubbleNumber={bubbles[bubbles.length - 1] ?? -1}
                />
                <ChooseBubble
                    bubbleList={dataBubbles?.bubbles}
                    myBubbles={myBubbles}
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
                <Button
                    color={"purple"}
                    text={"BUY BUBBLES"}
                    onClick={() => {
                        buyBubbles(bubbles).then(async function (value) {
                            getBubbles().then((value) => {
                                setMyBubbles([...value.my]);
                                setBubbles([]);
                            });
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default BubblesShop;

