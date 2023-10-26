import React, {FC} from 'react';
import styles from "./TokenPanel.module.css"
import {Asset} from "../../types";

interface Props {
    token: Asset;
}

const TokenPanel:FC<Props> = ({token}) => {
    return (
        <>
            <div className={styles.tokenNameContainer}>
                <img src={token?.logoUrl} alt={""}/>
                <div>{token?.ticker?.toUpperCase() || token?.originalTicker?.toUpperCase()}</div>
            </div>
            <span>on</span>
            <div className={styles.tokenNameContainer}>
                <img src={token?.locatedZone.logoUrl} alt={""}/>
                <div>{token?.locatedZone.name || token?.locatedZone.name}</div>
            </div>
        </>
    );
};

export default TokenPanel;