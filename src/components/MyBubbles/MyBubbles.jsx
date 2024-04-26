import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import Button from "../Button/Button";
import InfoModal from "../InfoModal/InfoModal";

import info from "../../../public/assets/info.svg";
import cross from "../../../public/assets/cross.svg";

import styles from "./styles.module.css";
import "swiper/css/pagination";
import "swiper/css";

import data from "../../data/data";

const MyBubbles = () => {
    const [modalState, setModalState] = useState(0);

    return (
        <div className={styles.bubblesWrapper}>
            <h1 className={styles.bubblesHeader}>My Bubbles</h1>
            <div className={styles.bubblesContainer}>
                <div className={styles.bubblesBackground}></div>
                <Swiper
                    spaceBetween={0}
                    onSlideChange={() => setModalState(0)}
                    enabled={!modalState}
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    style={{ height: "100%" }}
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <InfoModal
                                modalState={modalState}
                                strength={item.strength}
                                earn={item.earn}
                                modes={item.modes}
                            />
                            <div className={styles.slideContainer}>
                                <div className={styles.coin}>{item.coin}</div>
                                <img
                                    className={styles.slideImage}
                                    src={item.image}
                                    alt="Bubble"
                                />
                                <Button
                                    color={modalState == 1 ? "blue" : "green"}
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
