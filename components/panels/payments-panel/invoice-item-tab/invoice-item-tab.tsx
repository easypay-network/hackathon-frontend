import React, {FunctionComponent, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./invoice-item-tab.module.css";
import {useRouter} from "next/router";
import {Asset, Invoice} from "../../../types";
import {CustomDivider, CustomGridRow, TokenAmountItem, InformationContainer} from "../../../items";
import {InvoiceStatusItem} from "./invoice-status-item";
import {CommonButton} from "../../../buttons";
import axios from "axios";
import {apiUrl} from "../../../constants";
import { PaymentConfirmModal } from "../../../modals";

export const InvoiceItemTab: FunctionComponent = () => {
    const router = useRouter();
    const {invoice} = router.query;

    const [open, setOpen] = useState(false);

    const [invoicePage, setInvoicePage] = useState(true);

    const [invoiceItem, setInvoiceItem] = useState<Invoice>();

    useEffect(() => {
        if (!invoice) {
            return
        }

        axios.get(`${apiUrl}/invoices/${invoice}`)
            .then((response) => {
                setInvoiceItem(response.data);
            })
            .catch((error) => console.error(error));
    }, [invoice]);

    return (
        <>
            {invoiceItem &&
                <InformationContainer padding="25px">
                    {invoicePage ?
                        <>
                            <Box sx={{display: 'flex', flexDirection: 'column', width: '70%', rowGap: '14px'}}>
                                <CustomGridRow label='Title:'>
                                    <Typography className='bold30'>
                                        {invoiceItem?.title}
                                    </Typography>
                                </CustomGridRow>
                                <CustomGridRow label='Service id:'>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <Typography className='bold12'>#</Typography>
                                        <Typography className='bold20'>{invoiceItem?.identity}</Typography>
                                    </Box>
                                </CustomGridRow>
                                <CustomDivider/>
                                <CustomGridRow label='Requester:'>
                                    <Typography className='bold12'>{invoiceItem?.requester?.address}</Typography>
                                </CustomGridRow>
                                <CustomGridRow label='Receivers:'>
                                    <Typography className='bold12'>{invoiceItem?.receiver?.address}</Typography>
                                </CustomGridRow>
                                <CustomGridRow label='Payers:'>
                                    <Typography
                                        className='bold12'>{invoiceItem?.payerEmail?.address || invoiceItem?.payerWallet?.address || '—'}</Typography>
                                </CustomGridRow>
                                <CustomDivider/>
                                <CustomGridRow label='Requested:'>
                                    <TokenAmountItem tokenAsset={invoiceItem?.requestedAsset}
                                                     tokenAmount={invoiceItem?.requestedAmount}/>
                                </CustomGridRow>
                                <CustomGridRow label='Payed:'>
                                    <TokenAmountItem/>
                                </CustomGridRow>
                                <CustomDivider/>
                                <CustomGridRow label='Status:'>
                                    <InvoiceStatusItem status={invoiceItem?.status}/>
                                </CustomGridRow>
                                <CustomGridRow label='Creation date:'>
                                    {invoiceItem?.creationDate &&
                                        <Typography className='bold12'>
                                            {invoiceItem.creationDate.split("T")[1]}&nbsp;{invoiceItem.creationDate.split("T")[0]}
                                        </Typography>
                                    }
                                </CustomGridRow>
                                <CustomGridRow label='Due date:'>
                                    {invoiceItem?.dueDate &&
                                        <Typography className='bold12'>
                                            {invoiceItem.dueDate.split("T")[1]}&nbsp;{invoiceItem.dueDate.split("T")[0]}
                                        </Typography>
                                    }
                                </CustomGridRow>
                                <CustomGridRow label='Txs:'>
                                    <Typography className='bold12'>—</Typography>
                                </CustomGridRow>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'column', width: '30%', padding: '0 30px'}}>
                                <Box sx={{display: 'flex', columnGap: '30px'}}>
                                    <CommonButton className={styles.editButton} onClick={() => console.log('edit')}>
                                        <Typography className="bold16">Edit</Typography>
                                    </CommonButton>
                                    <CommonButton className={styles.rejectButton} onClick={() => console.log('reject')}>
                                        <Typography className="bold16">Reject</Typography>
                                    </CommonButton>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "30px",
                                    marginBottom: "70px"
                                }}>
                                    <img src={invoiceItem?.imageUrl} className={styles.invoiceImage}/>
                                </Box>
                                <Box>
                                    <CommonButton className={styles.processedButton}
                                                  onClick={()=> setInvoicePage(false)}>
                                        <Typography className="bold16">Proceed to payment</Typography>
                                    </CommonButton>
                                </Box>
                            </Box>
                        </>
                        :
                        <>
                            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', rowGap: '14px'}}>
                                <Box>
                                    <Typography className='bold30' textAlign='center'>
                                        Payment info
                                    </Typography>
                                </Box>
                                <CustomDivider/>
                                <CustomGridRow label='Requested:'>
                                    <TokenAmountItem tokenAsset={invoiceItem?.requestedAsset}
                                                     tokenAmount={invoiceItem?.requestedAmount}/>
                                </CustomGridRow>
                                <CustomGridRow label='Payed:'>
                                    <TokenAmountItem tokenAsset={invoiceItem?.payedAsset}
                                                     tokenAmount={invoiceItem?.payedAmount}
                                                     disabledSelect={false}
                                                     handleTokenChange={(token: Asset) => {
                                                         setInvoiceItem({...invoiceItem, payedAsset: token , payedAmount: 0} as Invoice);
                                                     }}
                                    />
                                </CustomGridRow>
                                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                                    <CommonButton width='200px' onClick={()=>setOpen(true)}>
                                        <Typography className="bold16">Initiate payment</Typography>
                                    </CommonButton>
                                </Box>
                            </Box>
                        </>
                    }
                </InformationContainer>
            }

            <PaymentConfirmModal
                open={open}
                setOpen={setOpen}
                invoiceItem={invoiceItem}
            />
        </>
    );
}
