import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./asset-selector.module.css";
import {Asset} from "../../types";
import axios from "axios";
import {apiUrl} from "../../constants";

interface Props {
    selectedAsset?: Asset;
    updateSelectedAsset?: Function;
}

export const AssetSelector: FunctionComponent<Props> = ({selectedAsset, updateSelectedAsset=()=>{}}) => {
    const [assets, setAssets] = useState<Asset[]>([]);

    useEffect(() => {
        axios.get(`${apiUrl}/assets`)
            .then((response) => {
                setAssets(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            {!assets.length ?
                <select disabled={true}
                        className={`${styles.tokenSelect} ${styles.pulsatingText}`}>
                    <option>Loading...</option>
                </select>
                :
                <select className={styles.tokenSelect}
                        value={selectedAsset?.denom}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const asset = assets.filter((asset) => asset.denom === e.target.value)[0];
                            updateSelectedAsset(asset);
                        }}
                >
                    <option>{''}</option>
                    {assets.map((asset) => (
                        <option key={asset.denom} value={asset.denom} className={styles.assetList}>
                            {asset.ticker ? asset.ticker.toUpperCase() : asset.localTicker?.toUpperCase()}
                            &nbsp;&nbsp;&nbsp;&nbsp;on&nbsp;&nbsp;&nbsp;&nbsp;
                            {asset.locatedZone.name.toUpperCase()}
                        </option>
                    ))}
                </select>}
        </>
    );
}