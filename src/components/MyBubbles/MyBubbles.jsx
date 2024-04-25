import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import Button from "../Button/Button";

import ton from "../../../public/assets/bubble.png";
import btc from "../../../public/assets/btc.png";
import solana from "../../../public/assets/solana.png";
import info from "../../../public/assets/info.svg";

import styles from "./styles.module.css";
import "swiper/css/pagination";
import "swiper/css";

let data = [
    {
        id: 0,
        coin: "TON",
        strength: "No Limits",
        earn: "1 life (1% of stake)",
        modes: "Free + Pay",
        image: ton,
    },
    {
        id: 1,
        coin: "Solana",
        strength: "No Limits",
        earn: "1 life (1% of stake)",
        modes: "Free + Pay",
        image: solana,
    },
    {
        id: 2,
        coin: "BTC",
        strength: "No Limits",
        earn: "1 life (1% of stake)",
        modes: "Free + Pay",
        image: btc,
    },
];

const MyBubbles = () => {
    return (
        <>
            <h1 className={styles.bubblesHeader}>My Bubbles</h1>
            <div className={styles.bubblesContainer}>
                <div className={styles.bubblesBackground}></div>
                <Swiper
                    spaceBetween={50}
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    style={{ height: "100%" }}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className={styles.slideContainer}>
                                <div className={styles.coin}>{item.coin}</div>
                                <img
                                    className={styles.slideImage}
                                    src={item.image}
                                    alt="Bubble"
                                />
                                <Button
                                    color={"green"}
                                    image={info}
                                    className={styles.slideButton}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default MyBubbles;
