import * as React from "react";
import styles from './select-token.module.css'
import {FunctionComponent} from "react";
import {Asset} from '../types'

interface Select1Props {
    assets: Asset[];
    disabledSelect: boolean,
    disabledInput: boolean
    label: string;
    token: Asset;
    amount: string;
    onDataUpdate: (token: Asset, amount: string) => void;
}

const SelectToken: FunctionComponent<Select1Props> = ({assets, label, disabledSelect, disabledInput, token, amount, onDataUpdate}) => {
    const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const asset = assets.filter((asset) => asset.denom === event.target.value)[0];
        onDataUpdate(asset, amount);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value;
        onDataUpdate(token, newAmount);
    };

    return (
        <div className={styles.tokenContainer}>
            <span className={styles.tokenTittle}>{label}</span>
            <div className={styles.selectContainer}>
                <label className={styles.selectLabel}>Token</label>
                <select disabled={disabledSelect} className={styles.tokenSelect} onChange={handleTokenChange}>
                    <option>{''}</option>
                    {assets.map((asset) => (
                        <option key={asset.denom} className={styles.assetList} value={asset.denom}>
                            {asset.ticker ? asset.ticker.toUpperCase() : asset.localTicker?.toUpperCase()}
                            &nbsp;&nbsp;&nbsp;&nbsp;on&nbsp;&nbsp;&nbsp;&nbsp;
                            {asset.locatedZone.name.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.selectContainer}>
                <label className={styles.amountLabel}>Amount</label>
                <input disabled={disabledInput} value={amount} type={'number'} className={styles.amountInput} onChange={handleAmountChange}/>
            </div>
        </div>
    );
};

export default SelectToken;