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
                <h2 className={styles.transactionsHeading}>Transactions</h2>
                <Button
                    image={cross}
                    color={"purpleTransparent"}
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
                        color={"purpleTransparent"}
                        className={clsx(styles.buttonOperation, styles.green)}
                        onClick={() => {
                            let transactions =
                                document.querySelector("#transactions");
                            let receive = document.querySelector("#receive");
                            receive.style.display = "flex";
                            transactions.style.display = "none";
                        }}
                    />
                    <Button
                        text={"Withdraw"}
                        color={"purpleTransparent"}
                        image={outcoming}
                        className={clsx(styles.buttonOperation, styles.red)}
                        onClick={() => {
                            let transactions =
                                document.querySelector("#transactions");
                            let send = document.querySelector("#send");
                            send.style.display = "flex";
                            transactions.style.display = "none";
                        }}
                    />
                </div>
                <div className={styles.historyContainer}>
                    <span>History</span>
                    {transactions.map((item) => (
                        <Transaction
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            amount={item.amount}
                            date={item.date}
                            direction={item.direction}
                        />
                    ))}
                </div>
            </div>
            <div
                className={styles.squadName}
                onClick={() => {
                    let referral = document.querySelector("#referral");
                    referral.style.display = "flex";
                }}
            >
                MY SQUAD
            </div>
        </div>
    );
};

export default Transactions;
