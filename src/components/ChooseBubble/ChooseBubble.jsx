import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import useSound from "use-sound";

import click from "../../../public/sounds/button.mp3";

import CheckBox from "../CheckBox/CheckBox";

import arrowRight from "../../../public/assets/arrowRight.svg";
import arrowLeft from "../../../public/assets/arrowLeft.svg";

import bubbles from "../../data/bubbles";

import styles from "./styles.module.css";
import "swiper/css/navigation";
import "swiper/css";

const ChooseBubble = ({
    noBackground = false,
    noTitle = false,
    multipleChoice = false,
    handleChange,
    bubbleList,
    myBubbles,
    localBubbles,
}) => {
    const [colorToggle, setColorToggle] = useState(false);
    const [bubbleId, setBubbleId] = useState([]);
    const [innerBubbles, setInnerBubbles] = useState(myBubbles);

    let result = [];
    let silverCounter = 0;
    let goldCounter = 0;

    if (bubbleList) {
        // console.log("bubbles", myBubbles);
        result = bubbleList.filter((item) =>
            multipleChoice == true
                ? !myBubbles.includes(item.ID)
                : myBubbles.includes(item.ID)
        );
        silverCounter = 0;
        goldCounter = 0;
        result.forEach((item) => {
            item.IsGold ? goldCounter++ : silverCounter++;
        });
    }

    // if (multipleChoice == false && localBubbles == []) {
    //     setBubbleId([1]);
    //     handleChange([1]);
    // }

    useEffect(() => {
        console.log(multipleChoice == false && bubbleId == []);
        if (multipleChoice == false && bubbleId == []) {
            setBubbleId([1]);
            handleChange([1]);
        }
    }, []);

    const [play] = useSound(click);

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
                            colorToggle == true
                                ? styles.colorInactive
                                : styles.colorActive
                        }
                        onClick={() => {
                            setColorToggle(false);
                            play();
                        }}
                    >
                        Silver
                    </span>{" "}
                    |{" "}
                    <span
                        className={
                            colorToggle == false
                                ? styles.colorInactive
                                : styles.colorActive
                        }
                        onClick={() => {
                            setColorToggle(true);
                            play();
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
                <div
                    className={
                        (colorToggle == true && goldCounter == 0) ||
                        (colorToggle == false && silverCounter == 0)
                            ? styles.swiperAlert
                            : styles.swiperInvisible
                    }
                >
                    {multipleChoice ? "Nothing to buy!" : "Nothing to show"}
                </div>
                <Swiper
                    style={{ height: "100%" }}
                    modules={[Navigation]}
                    watchOverflow={false}
                    navigation={{
                        nextEl: ".buttonNext_main",
                        prevEl: ".buttonPrev_main",
                    }}
                    slidesPerView={4}
                    spaceBetween={10}
                    id="swiper-select"
                >
                    {result.map((item) =>
                        item.IsGold == colorToggle ? (
                            <SwiperSlide
                                key={item.ID}
                                onClick={() => {
                                    play();
                                    if (multipleChoice == true) {
                                        let localArray = [...bubbleId];
                                        bubbleId.indexOf(item.ID) == -1
                                            ? localArray.push(item.ID)
                                            : localArray.splice(
                                                  bubbleId.indexOf(item.ID),
                                                  1
                                              );
                                        handleChange(localArray);
                                        setBubbleId(localArray);
                                    } else {
                                        let localArray = [item.ID];
                                        handleChange(localArray);
                                        setBubbleId(localArray);
                                    }
                                }}
                            >
                                <img
                                    className={styles.slideImage}
                                    src={bubbles[item.ID - 1].image}
                                    alt="Bubble"
                                />
                                <CheckBox
                                    className={styles.checkbox}
                                    isChecked={
                                        bubbleId.indexOf(item.ID) !== -1
                                            ? true
                                            : false
                                    }
                                />
                            </SwiperSlide>
                        ) : null
                    )}
                    <SwiperSlide></SwiperSlide>
                </Swiper>
                <div className={styles.gradientRight}>
                    <div className="buttonNext_main">
                        <img src={arrowRight} alt="Next" onClick={play} />
                    </div>
                </div>
                <div className={styles.gradientLeft}>
                    <div className="buttonPrev_main">
                        <img src={arrowLeft} alt="Previous" onClick={play} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseBubble;

