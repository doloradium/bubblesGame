import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import styles from "./styles.module.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import RateItem from "../RateItem/RateItem";

import firstPlace from "../../../public/assets/firstPlace.svg";
import arrow from "../../../public/assets/arrowNextRound.svg";

import rating from "../../data/rating";

const WeeklyRate = () => {
    useEffect(() => {
        let swiper = document.querySelector("#outerPagination");
        swiper.children[0].classList.add("noMargin");
    }, []);

    return (
        <div className={styles.rateWrapper}>
            <img src={firstPlace} alt="Place" className={styles.ratePlace} />
            <div className={styles.rateContainer}>
                <h2 className={styles.rateHeading}>Weekly Rate</h2>
                <Swiper
                    spaceBetween={0}
                    modules={[Pagination, Navigation]}
                    pagination={{
                        clickable: true,
                        el: ".ratePagination",
                    }}
                    navigation={{
                        nextEl: ".buttonNext",
                        prevEl: ".buttonPrev",
                    }}
                    slidesPerView={1}
                    id="outerPagination"
                >
                    {rating.map((item) => (
                        <SwiperSlide key={item.id}>
                            <RateItem
                                image={item.image}
                                score={item.score}
                                win={item.win}
                                users={item.users}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="buttonNext">
                    <img src={arrow} alt="Next" />
                </div>
                <div className="buttonPrev">
                    <img src={arrow} alt="Previous" />
                </div>
            </div>
            <div className="ratePagination"></div>
        </div>
    );
};

export default WeeklyRate;
