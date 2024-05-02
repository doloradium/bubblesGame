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
        <div className={styles.modalWrapper} id="weekly-modal">
            <div className={styles.modalContainer}>
                <div className={styles.modalBackground}></div>
                <Button
                    className={styles.closeButton}
                    image={cross}
                    color={"blue"}
                    onClick={() => {
                        let weeklyModal =
                            document.querySelector("#weekly-modal");
                        weeklyModal.style.display = "none";
                    }}
                />
                <img className={styles.modalImage} src={cup} alt="Cup" />
                <h2 className={styles.modalHeading}>
                    Сongratulations! <br /> Your weekly bonus is:
                </h2>
                <div className={styles.bonusContainer}>
                    <div className={styles.bonusGrid}>
                        <h1 className={styles.bonusAmount}>100 TON</h1>
                        <div className={styles.bonusInfo}>
                            <div className={styles.bonusNumbers}>2</div>
                            <div className={styles.bonusDescription}>
                                Your Legion <br /> Number
                            </div>
                        </div>
                        <div className={styles.bonusInfo}>
                            <div className={styles.bonusNumbers}>98</div>
                            <div className={styles.bonusDescription}>
                                Your <br />
                                Score
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className={styles.modalHeading}>Bonus Rate (TON)</h2>
                <div className={styles.legionContainer}>
                    {legions.map((item) => (
                        <div className={styles.legionItem}>
                            <h2 className={styles.modalHeading}>
                                {item.place}
                            </h2>
                            <img
                                src={item.image}
                                alt="Legion"
                                className={styles.legionImage}
                            />
                            <div className={styles.legionNumbers}>
                                {item.score}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalWeekly;
