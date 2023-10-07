import React, {FunctionComponent, useState} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./payment-confirm-modal.module.css";
import {CustomDivider, CustomGridRow, TokenAmountItem} from "../../items";
import {Invoice, PathFinderResponse} from "../../types";
import {CommonButton} from "../../buttons";
import {CommonModal} from "../common-modal";
import {useKeplerContext} from "../../../contexts";
import {PaymentStatusModal} from "..";
import {AccountData, Coin, StdFee} from "@keplr-wallet/types";
import {Dec, DecUtils} from "@keplr-wallet/unit";
import Long from "long";
import {rpcAddresses} from "../../constants";
import {SigningStargateClient} from "@cosmjs/stargate";
import {EncodeObject} from "@cosmjs/proto-signing";

interface Props {
    open: boolean;
    setOpen: Function;
    invoiceItem?: Invoice;
    pathFinderResponse?: PathFinderResponse;
}

export const PaymentConfirmModal: FunctionComponent<Props> = ({open, setOpen, invoiceItem, pathFinderResponse}) => {
    const {kepler} = useKeplerContext();

    const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState(false);
    const [openFailedPaymentModal, setOpenFailedPaymentModal] = useState(false);
    const [openPendingPaymentModal, setOpenPendingPaymentModal] = useState(false);

    const [transactionNumber, setTransactionNumber] = useState('');

    const constructTxMessage = (senderAddress: string) => {
        const denom = invoiceItem?.requestedAsset?.denom || "";
        const receiverAddress = pathFinderResponse?.address || "";
        const requestedAmount = pathFinderResponse?.destinationTokenAmount || 0;

        const transactionType = pathFinderResponse?.transactionType;

        const tokenAmount: Coin =  {
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

    const approvePayment = async () => {
        const denom = invoiceItem?.requestedAsset?.denom || "";
        const chainId = invoiceItem?.requestedAsset?.locatedZone?.networkId || "";
        const txMemo = pathFinderResponse?.txMemo || '';

        if (!kepler) {
            alert("Kepler is not setup");
            return;
        }

        const defaultFee: StdFee = {
            amount: [{denom: denom, amount: "500"}],
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
        }).finally(() => {
            setOpen(false);
        });
    }

    return (
        <>
            <CommonModal
                modalContainerStyle={styles.paymentModalContainer}
                open={open}
                setOpen={setOpen}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '14px'}}>
                    <Box>
                        <Typography className='bold20' textAlign='center'>
                            Final payment info
                        </Typography>
                    </Box>
                    <CustomDivider/>
                    <CustomGridRow label="Title:">
                        <Typography className='bold30'>
                            {invoiceItem?.title}
                        </Typography>
                    </CustomGridRow>
                    <CustomGridRow label="Service id:">
                        <Box sx={{display: 'flex', alignItems: 'flex-end', width: '75%'}}>
                            <Typography className='bold12'>#</Typography>
                            <Typography className='bold20'>{invoiceItem?.identity}</Typography>
                        </Box>
                    </CustomGridRow>
                    <CustomDivider/>
                    <CustomGridRow label="Requester:">
                        <Typography className='bold12'>{invoiceItem?.requester?.address}</Typography>
                    </CustomGridRow>
                    <CustomGridRow label="Receivers:">
                        <Typography className='bold12'>{invoiceItem?.receiver?.address}</Typography>
                    </CustomGridRow>
                    <CustomDivider/>
                    <CustomGridRow label="Payed:">
                        <TokenAmountItem tokenAsset={invoiceItem?.requestedAsset}
                                         tokenAmount={invoiceItem?.requestedAmount}/>
                    </CustomGridRow>
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                        <CommonButton onClick={approvePayment}>
                            <Typography className="bold16">Approve</Typography>
                        </CommonButton>
                    </Box>
                </Box>
            </CommonModal>

            <PaymentStatusModal modalContainerStyle={styles.successModalContainer}
                                open={openSuccessPaymentModal}
                                setOpen={setOpenSuccessPaymentModal}>
                <Box>
                    <Typography className='bold40' color='rgba(0, 173, 69, 1)'>
                        Success!
                    </Typography>
                    <Typography className='bold14'>
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
                    <Typography className='bold40' color='rgba(255, 83, 83, 1)'>
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
                    <Typography className='bold40' color='rgba(43,89,180, 1)'>
                        Transferring...
                    </Typography>
                    <Typography className='bold14'>
                        Please wait a little.
                    </Typography>
                </Box>
            </PaymentStatusModal>
        </>
    );
}