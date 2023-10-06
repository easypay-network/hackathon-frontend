import React, {FunctionComponent, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./invoice-item-tab.module.css";
import {useRouter} from "next/router";
import {Invoice} from "../../../types";
import {CustomDivider, CustomGridRow} from "../../../items";
import classNames from "classnames";
import RemoveIcon from "@mui/icons-material/Remove";

export const InvoiceItemTab: FunctionComponent = () => {
    const router = useRouter();
    const {invoice} = router.query;

    const [invoiceItem, setInvoiceItem] = useState<Invoice>();


    useEffect(() => {
        if (!invoice) {
            return
        }

        let a = {
                "identity": 13,
                "title": "Invoice to Alexandra",
                "description": "Nothing to say at the moment",
                "imageUrl": "https://www.zenefits.com/workest/wp-content/uploads/2023/01/compensation-vs-salary.jpg",
                "requestedAmount": 1.0,
                "payedAmount": 0.0,
                "status": "pending",
                "creationDate": "2023-01-01T10:00:00",
                "dueDate": "2024-01-01T10:00:00",
                "type": "invoice",
                "direction": "INCOMING",
                "receiver": {
                    "identity": 11,
                    "address": "osmo1v75ufqsddpeq38yphd89ztyt8gg2v73hx679yc",
                    "relatedZone": {
                        "identity": 10,
                        "logoUrl": "https://avatars.githubusercontent.com/u/79296913?s=48&v=4",
                        "networkId": "osmo-test-5",
                        "name": "Osmosis testnet"
                    }
                },
                "requester": {
                    "identity": 12,
                    "address": "dharapko@gmail.com"
                },
                "requestedAsset": {
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
                "payerWallet": null,
                "payerEmail": null
            };

        // @ts-ignore
        setInvoiceItem(a as Invoice);
    }, [invoice]);

    return (
        <>
            {invoiceItem &&
                <Box borderRadius="6px" overflow='hidden'>
                    <Box className={classNames(styles.container)}>
                        <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: '1', rowGap: '14px'}}>
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
                                {invoiceItem?.requestedAmount &&
                                    <>
                                        <Typography className='bold12'>{invoiceItem.requestedAmount}</Typography>
                                        <Typography className='bold12' textTransform='uppercase'>
                                            {invoiceItem.requestedAsset?.ticker || invoiceItem.requestedAsset?.originalTicker}
                                        </Typography>
                                    </>
                                    ||
                                    <RemoveIcon/>
                                }
                            </CustomGridRow>
                            <CustomGridRow label='Payed:'>
                                <RemoveIcon/>
                            </CustomGridRow>
                            <CustomDivider/>
                            <CustomGridRow label='Status:'>
                                <Typography className='bold12'>{invoiceItem?.status}</Typography>
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
                    </Box>
                </Box>
            }
        </>
    );
}
