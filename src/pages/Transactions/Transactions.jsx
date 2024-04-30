import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import Button from "../../components/Button/Button";
import Transaction from "../../components/Transaction/Transaction";

import incoming from "../../../public/assets/incoming.svg";
import outcoming from "../../../public/assets/outcoming.svg";
import cross from "../../../public/assets/cross.svg";

import transactions from "../../data/transactions";

const Transactions = () => {
    return (
        <div className={styles.transactionsWrapper} id="transactions">
            <div className={styles.transactionsContainer}>
                <Button
                    image={cross}
                    className={styles.buttonClose}
                    onClick={() => {
                        let transactions =
                            document.querySelector("#transactions");
                        let main = document.querySelector("#main");
                        main.style.display = "flex";
                        transactions.style.display = "none";
                    }}
                />
                <div className={styles.operationContainer}>
                    <Button
                        text={"Deposit"}
                        image={incoming}
                        className={clsx(styles.buttonOperation, styles.green)}
                    />
                    <Button
                        text={"Withdraw"}
                        image={outcoming}
                        className={clsx(styles.buttonOperation, styles.red)}
                    />
                </div>
                <div className={styles.historyContainer}>
                    <span>History</span>
                    {transactions.map((item) => (
                        <Transaction
                            image={item.image}
                            name={item.name}
                            amount={item.amount}
                            date={item.date}
                            direction={item.direction}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.squadName}>MY SQUAD</div>
        </div>
    );
};

export default Transactions;
