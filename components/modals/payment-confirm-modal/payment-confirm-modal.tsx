import React, {FunctionComponent, useState} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./payment-confirm-modal.module.css";
import {CustomDivider, CustomGridRow, TokenAmountItem} from "../../items";
import {Invoice, PathFinderResponse} from "../../types";
import {CommonButton} from "../../buttons";
import {CommonModal} from "../common-modal";
import {useKeplrContext, usePhantomContext} from "../../../contexts";
import {PaymentStatusModal} from "..";
import {AccountData, Coin, StdFee} from "@keplr-wallet/types";
import {Dec, DecUtils} from "@keplr-wallet/unit";
import Long from "long";
import {keplrNetworks, phantomNetworks, rpcAddresses} from "../../constants";
import {SigningStargateClient} from "@cosmjs/stargate";
import {EncodeObject} from "@cosmjs/proto-signing";
import {Connection, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import pollSignatureStatus from "../../utils/pollSignatureStatus";

interface Props {
    open: boolean;
    setOpen: Function;
    invoiceItem?: Invoice;
    pathFinderResponse?: PathFinderResponse;
}

export const PaymentConfirmModal: FunctionComponent<Props> = ({open, setOpen, invoiceItem, pathFinderResponse}) => {
    const {keplr} = useKeplrContext();
    const {phantomProvider} = usePhantomContext();

    const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState(false);
    const [openFailedPaymentModal, setOpenFailedPaymentModal] = useState(false);
    const [openPendingPaymentModal, setOpenPendingPaymentModal] = useState(false);

    const [transactionNumber, setTransactionNumber] = useState('');

    const constructTxMessage = (senderAddress: string) => {
        const denom = invoiceItem?.requestedAsset?.denom || "";
        const receiverAddress = invoiceItem?.receiver?.address || "";
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

    const makePhantomTransaction = async () => {
        const denom = invoiceItem?.requestedAsset?.denom || "";
        const receiverAddress = invoiceItem?.receiver?.address || "";
        const requestedAmount = pathFinderResponse?.destinationTokenAmount || 0;

        const chainId = invoiceItem?.requestedAsset?.locatedZone?.networkId || "";

        const transactionType = pathFinderResponse?.transactionType;

        if (!phantomProvider) {
            alert("Phantom is not setup");
            return;
        }

        const rpcUrl = rpcAddresses.get(chainId) || "";

        if (transactionType === "TRANSFER") {
            const senderAddress = phantomProvider.publicKey;

            const connection = new Connection(rpcUrl);

            const transaction = new Transaction({
                feePayer: senderAddress,
                recentBlockhash: (await connection.getLatestBlockhash()).blockhash
            });

            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: senderAddress,
                    toPubkey: new PublicKey(receiverAddress),
                    lamports: BigInt(DecUtils.getTenExponentN(9).mul(new Dec(requestedAmount)).truncate().toString()),
                })
            );

            setOpenPendingPaymentModal(true);

            phantomProvider.signAndSendTransaction(
                transaction,
                {skipPreflight: false}
            ).then(({signature}) => {
                setTransactionNumber(signature);
                return pollSignatureStatus(signature, connection);
            }).then(() => {
                setOpenPendingPaymentModal(false);
                setOpenSuccessPaymentModal(true);
            }).catch((error) => {
                console.error(error);
                setOpenPendingPaymentModal(false);
                setOpenFailedPaymentModal(true);
            });
        } else {
            alert("IBC Transfer is not supported for Solana");
        }
    }

    const makeKeplrTransaction = async () => {
        const denom = invoiceItem?.requestedAsset?.denom || "";
        const chainId = invoiceItem?.requestedAsset?.locatedZone?.networkId || "";
        const txMemo = pathFinderResponse?.txMemo || '';

        if (!keplr) {
            alert("Keplr is not setup");
            return;
        }

        const defaultFee: StdFee = {
            amount: [{denom: denom, amount: "500"}],
            gas: "200000",
        };

        const offlineSigner = keplr.getOfflineSigner(chainId);
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

    const approvePayment = async () => {
        const chainId = invoiceItem?.requestedAsset?.locatedZone?.networkId || "";

        if (keplrNetworks.includes(chainId)) {
            await makeKeplrTransaction();
        } else if (phantomNetworks.includes(chainId)) {
            await makePhantomTransaction();
        } else {
            alert(`Network ${invoiceItem?.requestedAsset?.locatedZone?.name} is not supported yet.`);
        }
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
                <Box textAlign="center">
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