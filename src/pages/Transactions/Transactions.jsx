import React from "react";
import clsx from "clsx";
import useSound from "use-sound";

import styles from "./styles.module.css";

import click from "../../../public/sounds/button.mp3";

import Button from "../../components/Button/Button";
import Transaction from "../../components/Transaction/Transaction";

import incoming from "../../../public/assets/incoming.svg";
import outcoming from "../../../public/assets/outcoming.svg";
import cross from "../../../public/assets/cross.svg";

import transactions from "../../data/transactions";

const Transactions = () => {
    const [play] = useSound(click);

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
                        transactions.style.opacity = 0;
                        setTimeout(() => {
                            transactions.style.display = "none";
                        }, 100);
                    }}
                />
                <div className={styles.operationContainer}>
                    <Button
                        text={"Deposit"}
                        image={incoming}
                        color={"purpleTransparent"}
                        className={clsx(styles.buttonOperation, styles.green)}
                        onClick={() => {
                            let receive = document.querySelector("#receive");
                            receive.style.display = "flex";
                            setTimeout(() => {
                                receive.style.opacity = 1;
                            }, 100);
                        }}
                    />
                    <Button
                        text={"Withdraw"}
                        color={"purpleTransparent"}
                        image={outcoming}
                        className={clsx(styles.buttonOperation, styles.red)}
                        onClick={() => {
                            let send = document.querySelector("#send");
                            send.style.display = "flex";
                            setTimeout(() => {
                                send.style.opacity = 1;
                            }, 100);
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
                    play();
                    let referral = document.querySelector("#referral");
                    referral.style.display = "flex";
                    setTimeout(() => {
                        referral.style.opacity = 1;
                    }, 100);
                }}
            >
                MY SQUAD
            </div>
        </div>
    );
};

export default Transactions;

