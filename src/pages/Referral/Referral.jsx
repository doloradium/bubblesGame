import React from "react";

import arrowBack from "../../../public/assets/arrowBack.svg";

import ReferralProfile from "../../components/ReferralProfile/ReferralProfile";
import Button from "../../components/Button/Button";

import styles from "./styles.module.css";
import ReferralList from "../../components/ReferralList/ReferralList";

const Referral = () => {
    return (
        <div className={styles.referralWrapper} id="referral">
            <Button
                image={arrowBack}
                className={styles.buttonBack}
                color={"white"}
                onClick={() => {
                    let referral = document.querySelector("#referral");
                    referral.style.display = "none";
                }}
            />
            <ReferralProfile />
            <ReferralList />
        </div>
    );
};

export default Referral;
