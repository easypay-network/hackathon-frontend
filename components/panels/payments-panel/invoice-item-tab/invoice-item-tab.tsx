import React, {FunctionComponent, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./invoice-item-tab.module.css";
import {useRouter} from "next/router";
import {Asset, Invoice, PathFinderResponse} from "../../../types";
import {
    CustomDivider,
    CustomGridRow,
    TokenAmountItem,
    InformationContainer,
    BackwardPanel,
    LoadingItem
} from "../../../items";
import {InvoiceStatusItem} from "./invoice-status-item";
import {CommonButton} from "../../../buttons";
import axios from "axios";
import {apiUrl} from "../../../constants";
import { PaymentConfirmModal } from "../../../modals";
import RoutingTable from "../../../routing-table/routing-table";

export const InvoiceItemTab: FunctionComponent = () => {
    const router = useRouter();
    const {invoice} = router.query;

    const [open, setOpen] = useState(false);

    const [invoicePage, setInvoicePage] = useState(true);

    const [invoiceItem, setInvoiceItem] = useState<Invoice>();

    const [pathFinderResponse, setPathFinderResponse] = useState<PathFinderResponse>({} as PathFinderResponse)

    const [routingTableIsLoading, setRoutingTableIsLoading] = useState(false)

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

    const calculatePaymentPath = () => {
        setRoutingTableIsLoading(true)
        axios.get(`${apiUrl}/pathfinder/try`,
            {
                params: {
                    sourceDenom: invoiceItem?.payedAsset?.denom,
                    destinationDenom: invoiceItem?.requestedAsset?.denom,
                    amount: invoiceItem?.requestedAmount,
                    address: invoiceItem?.receiver?.address
                }
            })
            .then((response) => {
                setPathFinderResponse(response.data);
                setInvoiceItem({...invoiceItem, payedAmount: response.data.destinationTokenAmount} as Invoice);
                setRoutingTableIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setRoutingTableIsLoading(false);
            });
    }

    return (
        <>
            <BackwardPanel onClick={() => invoicePage && router.push('/payments/invoices') || setInvoicePage(true)}>
                <Typography textAlign='left' className='bold16'  color='rgba(136, 136, 136, 1)' >
                    Invoice:
                </Typography>
                <Typography textAlign='left' className='bold20'>
                    #{invoice}
                </Typography>
            </BackwardPanel>

            {!invoiceItem ? <LoadingItem/> :
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
                                <CustomGridRow label="Description:">
                                    <Typography className='bold30'>
                                        <Typography className='bold20'>{invoiceItem?.description}</Typography>
                                    </Typography>
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
                                    <CommonButton width='200px' onClick={calculatePaymentPath} disabled={!invoiceItem?.payedAsset}>
                                        <Typography className="bold16">Get routes</Typography>
                                    </CommonButton>
                                </Box>
                                <CustomDivider/>
                                {routingTableIsLoading ? <div style={{position: 'relative', height: '200px'}}><LoadingItem/></div> : <RoutingTable pathResults={pathFinderResponse?.pathResults || []}/>}
                                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                                    <CommonButton width='200px' onClick={()=>setOpen(true)} disabled={!invoiceItem?.payedAmount}>
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
                pathFinderResponse={pathFinderResponse}
            />
        </>
    );
}
