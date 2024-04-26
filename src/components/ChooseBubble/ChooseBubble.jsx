import React, { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./styles.module.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import data from "../../data/data";

const ChooseBubble = () => {
    const [colorToggle, setColorToggle] = useState("gold");

    return (
        <div className={styles.bubblesContainer}>
            <div className={styles.swiperHeader}>
                <h2 className={styles.swiperHeading}>Choose bubble</h2>
                <div className={styles.colorToggle}>
                    <span
                        className={
                            colorToggle == "silver"
                                ? styles.colorInactive
                                : styles.colorActive
                        }
                        onClick={() => {
                            setColorToggle("gold");
                        }}
                    >
                        Silver
                    </span>{" "}
                    |{" "}
                    <span
                        className={
                            colorToggle == "gold"
                                ? styles.colorInactive
                                : styles.colorActive
                        }
                        onClick={() => {
                            setColorToggle("silver");
                        }}
                    >
                        Gold
                    </span>
                </div>
            </div>
            {/* <div className={styles.gradientRight}></div>
            <div className={styles.gradientLeft}></div> */}
            <Swiper
                style={{ height: "100%" }}
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                slidesPerView={5}
                spaceBetween={0}
            >
                {data.map((item, key) =>
                    item.color == colorToggle ? (
                        <SwiperSlide key={key}>
                            <div className={styles.imageContainer}>
                                <img
                                    className={styles.slideImage}
                                    src={item.image}
                                    alt="Bubble"
                                />
                            </div>
                        </SwiperSlide>
                    ) : null
                )}
            </Swiper>
        </div>
    );
};

export default ChooseBubble;
