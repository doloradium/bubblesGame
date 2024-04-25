import React, { useState, useRef, useEffect, useCallback } from "react";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import MyBubbles from "../../components/MyBubbles/MyBubbles";

import coin from "../../../public/assets/coin.svg";

import styles from "./styles.module.css";

const Main = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("");
    const ws = useRef(null);

    useEffect(() => {
        if (!isPaused) {
            ws.current = new WebSocket("wss://ws.kraken.com/"); // создаем ws соединение
            ws.current.onopen = () => setStatus("Соединение открыто"); // callback на ивент открытия соединения
            ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения

            gettingData();
        }

        return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
    }, [ws, isPaused]);

    const gettingData = useCallback(() => {
        if (!ws.current) return;

        ws.current.onmessage = (e) => {
            //подписка на получение данных по вебсокету
            if (isPaused) return;
            const message = JSON.parse(e.data);
            setData(message);
        };
    }, [isPaused]);

    return (
        <>
            <div className={styles.pageContainer} id="main">
                <Header name={"VP"} balance={"100 TON"} />
                <MyBubbles />
                <Button text={"BUY MORE"} image={coin} color={"blue"} />
                <Button
                    color={"blue"}
                    text={"START GAME"}
                    onClick={() => {
                        let app = document.querySelector("#app");
                        let main = document.querySelector("#main");
                        app.style.display = "block";
                        main.style.display = "none";
                    }}
                />
                <p className={styles.clanName}>{data?.status}</p>
            </div>
        </>
    );
};

export default Main;
