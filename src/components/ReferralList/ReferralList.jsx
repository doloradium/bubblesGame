import React, { useState } from "react";

import Button from "../Button/Button";
import ListItem from "../ListItem/ListItem";

import copy from "../../../public/assets/copy.svg";
import user from "../../../public/assets/user.svg";

import referrals from "../../data/referrals";
import squads from "../../data/squads";

import styles from "./styles.module.css";
import SquadItem from "../SquadItem/SquadItem";

const ReferralList = () => {
    const [listType, setListType] = useState("line");

    return (
        <div className={styles.listWrapper}>
            <h3 className={styles.listHeading}>My Referral Link</h3>
            <div className={styles.listLink}>
                <input
                    value="https://www.bybit.com/invite?ref=P5MLW%530"
                    type="text"
                    readOnly
                    className={styles.listInput}
                />
                <img className={styles.listImage} src={copy} alt="Copy" />
            </div>
            <div className={styles.listToggle}>
                <Button
                    text={"My Line"}
                    className={listType == "line" ? styles.buttonActive : null}
                    color={listType == "line" ? "extraWhite" : "transparent"}
                    onClick={() => {
                        setListType("line");
                    }}
                />
                <Button
                    text={"Squad"}
                    className={listType == "squad" ? styles.buttonActive : null}
                    color={listType == "squad" ? "extraWhite" : "transparent"}
                    onClick={() => {
                        setListType("squad");
                    }}
                />
            </div>
            <div className={styles.listContainer}>
                <div className={styles.listHeader}>
                    {listType == "line" ? (
                        <>
                            <div className={styles.members}>
                                <img
                                    src={user}
                                    alt="User"
                                    className="listIcon"
                                />
                                <div className={styles.listMembers}>
                                    {referrals.length}
                                </div>
                            </div>
                            <div className={styles.listInfo}>
                                Bubbles / Score / Spent
                            </div>
                        </>
                    ) : (
                        <div className={styles.listMembers}>
                            {squads.length} Lines
                        </div>
                    )}
                </div>
                <div className={styles.listBlock}>
                    {listType == "line"
                        ? referrals.map((item) => (
                              <ListItem
                                  key={item.id}
                                  avatar={item.avatar}
                                  name={item.name}
                                  description={item.stats}
                              />
                          ))
                        : squads.map((item) => (
                              <SquadItem
                                  key={item.id}
                                  images={item.images}
                                  text={item.text}
                                  amount={item.amount}
                              />
                          ))}
                </div>
            </div>
        </div>
    );
};

export default ReferralList;
