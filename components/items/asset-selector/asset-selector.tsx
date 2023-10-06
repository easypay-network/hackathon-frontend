import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./asset-selector.module.css";
import {Asset} from "../../types";

interface Props {
    selectedAsset?: Asset;
    updateSelectedAsset?: Function;
}

export const AssetSelector: FunctionComponent<Props> = ({selectedAsset, updateSelectedAsset=()=>{}}) => {
    const [assets, setAssets] = useState<Asset[]>([]);

    useEffect(() => {
        let a = [
            {
                "identity": null,
                "ticker": "osmo",
                "logoUrl": "https://avatars.githubusercontent.com/u/79296913?s=48&v=4",
                "denom": "uosmo",
                "denomTrace": null,
                "originalTicker": null,
                "localTicker": null,
                "locatedZone": {
                    "identity": 10,
                    "logoUrl": "https://avatars.githubusercontent.com/u/79296913?s=48&v=4",
                    "networkId": "osmo-test-5",
                    "name": "Osmosis testnet"
                }
            },
            {
                "identity": null,
                "ticker": "ion",
                "logoUrl": "",
                "denom": "uion",
                "denomTrace": null,
                "originalTicker": null,
                "localTicker": null,
                "locatedZone": {
                    "identity": 10,
                    "logoUrl": "https://avatars.githubusercontent.com/u/79296913?s=48&v=4",
                    "networkId": "osmo-test-5",
                    "name": "Osmosis testnet"
                }
            },
            {
                "identity": null,
                "ticker": null,
                "logoUrl": null,
                "denom": "ibc/273...EB2",
                "denomTrace": "channel114",
                "originalTicker": "juno",
                "localTicker": "juno",
                "locatedZone": {
                    "identity": 10,
                    "logoUrl": "https://avatars.githubusercontent.com/u/79296913?s=48&v=4",
                    "networkId": "osmo-test-5",
                    "name": "Osmosis testnet"
                }
            },
            {
                "identity": null,
                "ticker": null,
                "logoUrl": null,
                "denom": "ibc/263...M3D",
                "denomTrace": "channel13/channel114",
                "originalTicker": "juno",
                "localTicker": "wjuno",
                "locatedZone": {
                    "identity": 7,
                    "logoUrl": null,
                    "networkId": "juno-1",
                    "name": "juno"
                }
            },
            {
                "identity": null,
                "ticker": null,
                "logoUrl": "https://avatars.githubusercontent.com/u/79296913?s=48&v=4",
                "denom": "ibc/235...QD4",
                "denomTrace": "channel37",
                "originalTicker": "osmo",
                "localTicker": "osmo",
                "locatedZone": {
                    "identity": 7,
                    "logoUrl": null,
                    "networkId": "juno-1",
                    "name": "juno"
                }
            },
            {
                "identity": null,
                "ticker": "juno",
                "logoUrl": "",
                "denom": "ujuno",
                "denomTrace": null,
                "originalTicker": null,
                "localTicker": null,
                "locatedZone": {
                    "identity": 7,
                    "logoUrl": null,
                    "networkId": "juno-1",
                    "name": "juno"
                }
            },
            {
                "identity": null,
                "ticker": null,
                "logoUrl": null,
                "denom": "ibc223HP3",
                "denomTrace": "channel37",
                "originalTicker": "ion",
                "localTicker": "ion2",
                "locatedZone": {
                    "identity": 7,
                    "logoUrl": null,
                    "networkId": "juno-1",
                    "name": "juno"
                }
            },
            {
                "identity": null,
                "ticker": null,
                "logoUrl": "https://avatars.githubusercontent.com/u/67522309?s=200&v=4",
                "denom": "ibc/9463E39D230614B313B487836D13A392BD1731928713D4C8427A083627048DB3",
                "denomTrace": "channel-3",
                "originalTicker": "AXL",
                "localTicker": "AXL",
                "locatedZone": {
                    "identity": 10,
                    "logoUrl": "https://avatars.githubusercontent.com/u/79296913?s=48&v=4",
                    "networkId": "osmo-test-5",
                    "name": "Osmosis testnet"
                }
            },
            {
                "identity": null,
                "ticker": "AXL",
                "logoUrl": "https://avatars.githubusercontent.com/u/67522309?s=200&v=4",
                "denom": "uaxl",
                "denomTrace": null,
                "originalTicker": null,
                "localTicker": null,
                "locatedZone": {
                    "identity": 32,
                    "logoUrl": "https://avatars.githubusercontent.com/u/67522309?s=200&v=4",
                    "networkId": "axelar-testnet-lisbon-3",
                    "name": "Axelar testnet"
                }
            },
            {
                "identity": null,
                "ticker": null,
                "logoUrl": null,
                "denom": "ibc/223...HP3",
                "denomTrace": "channel37",
                "originalTicker": "ion",
                "localTicker": "ion",
                "locatedZone": {
                    "identity": 7,
                    "logoUrl": null,
                    "networkId": "juno-1",
                    "name": "juno"
                }
            }
        ];

        // @ts-ignore
        setAssets(a as Asset[]);
    }, []);

    return (
        <select className={styles.tokenSelect}
                value={selectedAsset?.denom}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>)=> {
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
        </select>
    );
}