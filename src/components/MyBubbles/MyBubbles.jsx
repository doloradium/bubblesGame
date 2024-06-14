import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { useFetch } from "../../hooks/useFetch";
import { getBubbles } from "../../api/apiBubbles";

import Button from "../Button/Button";
import InfoModal from "../InfoModal/InfoModal";

import info from "../../../public/assets/info.svg";
import cross from "../../../public/assets/cross.svg";

import styles from "./styles.module.css";
import "swiper/css/pagination";
import "swiper/css";

import bubbles from "../../data/bubbles";

const MyBubbles = ({ bubbleList, myBubbles }) => {
    const [modalState, setModalState] = useState(0);

    // console.log(bubbleList);
    // console.log(myBubbles);

    useEffect(() => {
        let swiper = document.querySelector("#mainSwiper");
        // swiper.destroy();
        // swiper.init();
        // swiper.enabled = false;
    }, [modalState]);

    let result = [];

    if (bubbleList) {
        result = bubbleList.filter((item) => myBubbles.includes(item.ID));
        // console.log(result);
    }

    return (
        <div className={styles.bubblesWrapper}>
            <h1 className={styles.bubblesHeader}>My Bubbles</h1>
            <div className={styles.bubblesContainer}>
                <div className={styles.bubblesBackground}></div>
                <Swiper
                    id="mainSwiper"
                    observer={true}
                    rewind={true}
                    spaceBetween={0}
                    onSlideChange={() => setModalState(0)}
                    enabled={!modalState}
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    style={{ height: "100%" }}
                >
                    {result.map((item) => (
                        <SwiperSlide key={item.ID}>
                            <InfoModal
                                modalState={modalState}
                                earn={item.Earn}
                            />
                            <div className={styles.slideContainer}>
                                <div className={styles.coin}>{item.Name}</div>
                                <img
                                    className={styles.slideImage}
                                    src={bubbles[item.ID - 1].image}
                                    alt="Bubble"
                                />
                                <Button
                                    color={
                                        modalState == 1
                                            ? "purpleTransparent"
                                            : "green"
                                    }
                                    image={modalState == 1 ? cross : info}
                                    className={styles.slideButton}
                                    onClick={() => {
                                        modalState == 0
                                            ? setModalState(1)
                                            : setModalState(0);
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MyBubbles;

