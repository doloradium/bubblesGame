import React from "react";

import styles from "./styles.module.css";
import ChooseBubble from "../../components/ChooseBubble/ChooseBubble";
import Button from "../../components/Button/Button";

const BubblesShop = () => {
    return (
        <div className={styles.shopContainer}>
            <ChooseBubble />
            <Button color={"purple"} text={"BUY BUBBLES"} />
        </div>
    );
};

export default BubblesShop;
