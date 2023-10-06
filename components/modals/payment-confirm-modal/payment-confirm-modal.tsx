import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./payment-confirm-modal.module.css";
import {CustomDivider, CustomGridRow, TokenAmountItem} from "../../items";
import {Invoice} from "../../types";
import {CommonButton} from "../../buttons";
import {CommonModal} from "../common-modal";

interface Props {
    open: boolean;
    setOpen: Function;
    invoiceItem?: Invoice;
}

export const PaymentConfirmModal: FunctionComponent<Props> = ({open, setOpen, invoiceItem}) => {
    return (
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
                    <CommonButton onClick={()=>console.log(invoiceItem)}>
                        <Typography className="bold16">Approve</Typography>
                    </CommonButton>
                </Box>
            </Box>
        </CommonModal>
    );
}