import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import styles from "./styles.module.css";
import "swiper/css/pagination";
import "swiper/css";

import firstPlace from "../../../public/assets/firstPlace.svg";
import RateItem from "../RateItem/RateItem";

const WeeklyRate = () => {
    return (
        <div className={styles.rateWrapper}>
            <img src={firstPlace} alt="Place" className={styles.ratePlace} />
            <div className={styles.rateContainer}>
                <Swiper
                    spaceBetween={0}
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    style={{ height: "100%" }}
                >
                    <SwiperSlide>
                        <RateItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <RateItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <RateItem />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default WeeklyRate;
