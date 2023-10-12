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
import {apiUrl, rpcAddresses} from "../../constants";
import {useKeplerContext} from "../../../contexts";
import {AccountData, Coin, StdFee} from "@keplr-wallet/types";
import {Dec, DecUtils} from "@keplr-wallet/unit";
import Long from "long";
import {SigningStargateClient} from "@cosmjs/stargate";
import {EncodeObject} from "@cosmjs/proto-signing";
import {PaymentStatusModal} from "../../modals";
import {LoadingItem} from "../../items";

const SwapPage: NextPage = () => {
    const {kepler} = useKeplerContext();

    const [assets, setAssets] = useState<Asset[]>([])
    const [token1, setToken1] = useState<Asset>({} as Asset);
    const [token2, setToken2] = useState<Asset>({} as Asset);
    const [amount1, setAmount1] = useState<string>('');
    const [amount2, setAmount2] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState(false);
    const [openFailedPaymentModal, setOpenFailedPaymentModal] = useState(false);
    const [openPendingPaymentModal, setOpenPendingPaymentModal] = useState(false);

    const [transactionNumber, setTransactionNumber] = useState('');

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

    const [routingTableIsLoading, setRoutingTableIsLoading] = useState(false)

    const calculatePaymentPath = () => {
        if (token1 && token2 && amount1 && address) {
            setRoutingTableIsLoading(true);
            axios.get(`${apiUrl}/pathfinder/try`,
                {
                    params: {
                        sourceDenom: token1?.denom,
                        destinationDenom: token2?.denom,
                        amount: amount1,
                        address: address
                    }
                })
                .then((response) => {
                    setPathFinderResponse(response.data);
                    setAmount2(response.data.destinationTokenAmount);
                    setRoutingTableIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setRoutingTableIsLoading(false);
                });
        } else {
            alert('Fill in the fields');
        }
    }

    const constructTxMessage = (senderAddress: string) => {
        const denom = pathFinderResponse?.pathResults[0]?.startNode?.properties?.ticker || "";
        const receiverAddress = pathFinderResponse?.address || "";
        const requestedAmount = amount1 || 0;

        const transactionType = pathFinderResponse?.transactionType;

        const tokenAmount: Coin = {
            denom: denom,
            amount: DecUtils.getTenExponentN(6).mul(new Dec(requestedAmount)).truncate().toString(),
        };

        if (transactionType === "TRANSFER") {
            return {
                typeUrl: '/cosmos.bank.v1beta1.MsgSend',
                value: {
                    fromAddress: senderAddress,
                    toAddress: receiverAddress,
                    amount: [tokenAmount],
                }
            };
        } else {
            const ibcMemo = pathFinderResponse?.ibcMemo;
            const timeoutTimestampNanoseconds = Long.fromNumber(Math.floor(Date.now() / 1000) + 60).multiply(1_000_000_000);

            const inputChannel = pathFinderResponse?.pathResults[0].edge.properties.inputChannel;

            return {
                typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
                value: {
                    sourcePort: "transfer",
                    sourceChannel: inputChannel,
                    sender: senderAddress,
                    receiver: receiverAddress,
                    token: tokenAmount,
                    timeoutHeight: {revisionHeight: Long.fromNumber(0), revisionNumber: Long.fromNumber(0)},
                    timeoutTimestamp: timeoutTimestampNanoseconds,
                    memo: ibcMemo
                }
            };
        }
    }

    const makeSwap = async () => {
        const denom = token1?.denom || "";
        const chainId = token1?.locatedZone?.networkId || "";
        const txMemo = pathFinderResponse?.txMemo || '';

        if (!kepler) {
            alert("Kepler is not setup");
            return;
        }

        const defaultFee: StdFee = {
            amount: [{denom: denom, amount: "5000"}],
            gas: "200000",
        };

        const offlineSigner = kepler.getOfflineSigner(chainId);
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        const rpcUrl = rpcAddresses.get(chainId) || "";

        const signingClient = await SigningStargateClient.connectWithSigner(
            rpcUrl,
            offlineSigner,
        );

        const transferMsg = constructTxMessage(account.address) as EncodeObject;

        console.log(transferMsg);

        setOpenPendingPaymentModal(true);

        signingClient.signAndBroadcast(
            account.address,
            [transferMsg],
            defaultFee,
            txMemo
        ).then((deliverTxResponse) => {
            if (deliverTxResponse.code === 0) {
                setTransactionNumber(deliverTxResponse.transactionHash);
                setOpenPendingPaymentModal(false);
                setOpenSuccessPaymentModal(true);
            } else {
                setOpenPendingPaymentModal(false);
                setOpenFailedPaymentModal(true);
            }
        }).catch((error) => {
            console.error(error);
            setOpenPendingPaymentModal(false);
            setOpenFailedPaymentModal(true);
        });
    }


    return (
        <>
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
                    {!assets.length ? <LoadingItem/> :
                        <>
                            <SelectToken label={'From:'} token={token1} amount={amount1}
                                         onDataUpdate={handleDataFromSelect1} assets={assets} disabledSelect={false}
                                         disabledInput={false}/>
                            <SelectToken label={'to:'} token={token2} amount={amount2}
                                         onDataUpdate={handleDataFromSelect2} assets={assets} disabledSelect={false}
                                         disabledInput={true}/>
                            <div className={styles.tokenContainer}>
                                <div className={styles.addressContainer}>
                                    <label className={styles.addressLabel}>Address</label>
                                    <input className={styles.addressInput}
                                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}/>
                                </div>
                            </div>
                            <button onClick={calculatePaymentPath} className={styles.tempBtn}>Get routes</button>
                            <hr color={"#888"}/>
                            <h3>Routing</h3>
                            {routingTableIsLoading ? <div style={{position: 'relative', height: '200px'}}><LoadingItem/></div> : <RoutingTable pathResults={pathFinderResponse?.pathResults || []}/>}
                            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                                <CommonButton onClick={makeSwap} disabled={!pathFinderResponse?.pathResults}>
                                    <Typography className="bold16">Swap</Typography>
                                </CommonButton>
                            </Box>
                        </>
                    }
                </Box>
            </Box>

            <PaymentStatusModal modalContainerStyle={styles.successModalContainer}
                                open={openSuccessPaymentModal}
                                setOpen={setOpenSuccessPaymentModal}>
                <Box textAlign="center">
                    <Typography className='bold40' color='rgba(0, 173, 69, 1)' textAlign='center'>
                        Success!
                    </Typography>
                    <Typography className='bold14' textAlign='center'>
                        Transaction:
                        <br/>
                        {transactionNumber}
                    </Typography>
                </Box>
            </PaymentStatusModal>

            <PaymentStatusModal modalContainerStyle={styles.failModalContainer}
                                open={openFailedPaymentModal}
                                setOpen={setOpenFailedPaymentModal}>
                <Box textAlign="center">
                    <Typography className='bold40' color='rgba(255, 83, 83, 1)' textAlign='center'>
                        Failed!
                    </Typography>
                    <Typography className='bold14'>
                        Transaction was unsuccessful.
                    </Typography>
                </Box>
            </PaymentStatusModal>

            <PaymentStatusModal modalContainerStyle={styles.pendingModalContainer}
                                open={openPendingPaymentModal}
                                setOpen={setOpenPendingPaymentModal}>
                <Box textAlign="center">
                    <Typography className='bold40' color='rgba(43,89,180, 1)' textAlign='center'>
                        Transferring...
                    </Typography>
                    <Typography className='bold14'>
                        Please wait a little.
                    </Typography>
                </Box>
            </PaymentStatusModal>
        </>
    )
}

export default SwapPage;
