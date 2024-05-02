import React from "react";

import Button from "../Button/Button";

import styles from "./styles.module.css";

import cup from "../../../public/assets/cup.svg";
import cross from "../../../public/assets/cross.svg";

import legionAvatar from "../../../public/assets/legionAvatar.png";

let legions = [
    { id: 0, place: 1, image: legionAvatar, score: "86,121" },
    { id: 1, place: 2, image: legionAvatar, score: "75,281" },
    { id: 2, place: 3, image: legionAvatar, score: "86,121" },
    { id: 3, place: 4, image: legionAvatar, score: "86,121" },
];

const ModalWeekly = () => {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalBackground}></div>
            <Button image={cross} color={"blue"} />
            <img src={cup} alt="Cup" />
            <h2 className={styles.modalHeading}>
                Сongratulations! Your weekly bonus is:
            </h2>
            <div className={styles.bonusContainer}>
                <div className={styles.bonusGrid}>
                    <h1 className={styles.bonusAmount}>100 TON</h1>
                    <div className={styles.bonusInfo}>
                        <div className={styles.bonusNumbers}>2</div>
                        <div className={styles.bonusDescription}>
                            Your Legion Number
                        </div>
                    </div>
                    <div className={styles.bonusInfo}>
                        <div className={styles.bonusNumbers}>98</div>
                        <div className={styles.bonusDescription}>
                            Your Score
                        </div>
                    </div>
                </div>
            </div>
            <h2 className={styles.modalHeading}>Bonus Rate (TON)</h2>
            <div className={styles.legionContainer}>
                <div className={styles.legionItem}>
                    {legions.map((item) => (
                        <>
                            <h2 className={styles.modalHeading}>
                                {item.place}
                            </h2>
                            <img
                                src={item.image}
                                alt=""
                                className="legionImage"
                            />
                            <div className={styles.legionNumbers}>
                                {item.score}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalWeekly;
