import {NextPage} from "next";
import {Box, Typography} from "@mui/material";
import styles from './swap-panel.module.css'
import * as React from "react";
import {useEffect, useState} from "react";
import classNames from "classnames";
import axios from "axios";
import SelectToken from "../../select-token/select-token";
import {Asset, PathFinderResponse} from "../../types";
import RoutingTable from "../../routing-table/routing-table";
import {CommonButton} from "../../buttons";
import {apiUrl} from "../../constants"

const SwapPage: NextPage = () => {

    const [assets, setAssets] = useState<Asset[]>([])
    const [token1, setToken1] = useState<Asset>({} as Asset);
    const [token2, setToken2] = useState<Asset>({} as Asset);
    const [amount1, setAmount1] = useState<string>('');
    const [amount2, setAmount2] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const [pathFinderResponse, setPathFinderResponse] = useState<PathFinderResponse>({} as PathFinderResponse);

    useEffect(() => {
        axios.get(`${apiUrl}/assets`)
            .then((response) => {
                setAssets(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleDataFromSelect1 = (childToken: Asset, childAmount: string) => {
        setToken1(childToken);
        setAmount1(childAmount);
    };

    const handleDataFromSelect2 = (childToken: Asset, childAmount: string) => {
        setToken2(childToken);
        setAmount2(childAmount);
    };


    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{
                marginLeft: '100px',
                marginBottom: '20px'
            }}>
                <Typography textAlign='left' className={classNames(styles.panelTitle, 'bold40')}>
                    Swap
                </Typography>
            </Box>
            <Box className={styles.container}>
                <SelectToken  label={'From:'} token={token1} amount={amount1} onDataUpdate={handleDataFromSelect1} assets={assets} disabledSelect={false} disabledInput={false}/>
                <SelectToken  label={'to:'} token={token2} amount={amount2} onDataUpdate={handleDataFromSelect2} assets={assets} disabledSelect={false} disabledInput={true}/>
                <div className={styles.tokenContainer}>
                    <div className={styles.addressContainer}>
                        <label className={styles.addressLabel}>Address</label>
                        <input className={styles.addressInput} onChange={(event:React.ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}/>
                    </div>
                </div>
                <button onClick={() => console.log("calculatePaymentPath")} className={styles.tempBtn}>Get routes</button>
                <hr color={"#888"}/>
                <h3>Routing</h3>
                <RoutingTable pathResults={pathFinderResponse?.pathResults || []}/>
                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <CommonButton onClick={() => console.log("makeSwap")} disabled={!pathFinderResponse?.pathResults}>
                        <Typography className="bold16">Swap</Typography>
                    </CommonButton>
                </Box>
            </Box>
        </Box>
    )
}

export default SwapPage;
