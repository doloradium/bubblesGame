import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";

import CheckBox from "../CheckBox/CheckBox";

import arrowRight from "../../../public/assets/arrowRight.svg";
import arrowLeft from "../../../public/assets/arrowLeft.svg";

import styles from "./styles.module.css";
import "swiper/css/navigation";
import "swiper/css";

import data from "../../data/data";

const ChooseBubble = ({
    noBackground = false,
    noTitle = false,
    multipleChoice = false,
    handleChange,
    value,
}) => {
    const [colorToggle, setColorToggle] = useState("gold");
    const [bubbleId, setBubbleId] = useState([]);

    return (
        <div
            className={
                noBackground
                    ? styles.bubblesNoBackground
                    : styles.bubblesContainer
            }
        >
            <div className={styles.swiperHeader}>
                {noTitle ? null : (
                    <h2 className={styles.swiperHeading}>Choose bubble</h2>
                )}
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
            <div
                className={
                    noBackground == false
                        ? styles.swiperContainer
                        : clsx(styles.swiperContainer, styles.maxHeight)
                }
            >
                <Swiper
                    style={{ height: "100%" }}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".buttonNext_main",
                        prevEl: ".buttonPrev_main",
                    }}
                    slidesPerView={4}
                    spaceBetween={10}
                    id="swiper-select"
                >
                    {data.map((item) =>
                        item.color == colorToggle ? (
                            <SwiperSlide
                                key={item.id}
                                onClick={() => {
                                    if (multipleChoice == true) {
                                        let localArray = [...bubbleId];
                                        bubbleId.indexOf(item.id) == -1
                                            ? localArray.push(item.id)
                                            : localArray.splice(
                                                  bubbleId.indexOf(item.id),
                                                  1
                                              );
                                        setBubbleId(localArray);
                                        console.log(bubbleId);
                                    } else {
                                        let localArray = [item.id];
                                        setBubbleId(localArray);
                                        handleChange(bubbleId);
                                    }
                                }}
                            >
                                <div
                                    className={
                                        bubbleId.indexOf(item.id) !== -1
                                            ? styles.imageContainer
                                            : styles.imageInactive
                                    }
                                >
                                    <img
                                        className={styles.slideImage}
                                        src={item.image}
                                        alt="Bubble"
                                    />
                                    <CheckBox
                                        className={styles.checkbox}
                                        isChecked={
                                            bubbleId.indexOf(item.id) !== -1
                                                ? true
                                                : false
                                        }
                                    />
                                </div>
                            </SwiperSlide>
                        ) : null
                    )}
                    <SwiperSlide></SwiperSlide>
                </Swiper>
                <div className={styles.gradientRight}>
                    <div className="buttonNext_main">
                        <img src={arrowRight} alt="Next" />
                    </div>
                </div>
                <div className={styles.gradientLeft}>
                    <div className="buttonPrev_main">
                        <img src={arrowLeft} alt="Previous" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseBubble;
