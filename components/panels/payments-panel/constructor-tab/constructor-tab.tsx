import React, {FunctionComponent, useState} from "react";
import {Box, FormControlLabel, InputBase, Radio, RadioGroup, styled, Typography} from "@mui/material";
import styles from "./constructor-tab.module.css";
import classNames from "classnames";
import {format} from "date-fns";
import {CommonButton} from "../../../buttons";
import {Asset, Invoice} from "../../../types";
import {AssetSelector, CustomDivider} from "../../../items";

const StyledFormControlLabel= styled(FormControlLabel)(() => ({
    ['.MuiFormControlLabel-label']: {
        fontFamily: 'Inter, serif',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '19px'
    },
    ['.MuiRadio-root']: {
        padding: '2px'
    }
}));

const StyledRadio = styled(Radio)(() => ({
    ['&']: {
        color: 'white'
    },
    ['&.Mui-checked']: {
        color: 'white'
    }
}));

interface ConstructorRowProps {
    label: string;
    children?: React.ReactNode;
}

const ConstructorRow: FunctionComponent<ConstructorRowProps> = ({label, children}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', columnGap: '25px'}}>
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '25%'
            }}>
                <Typography className='bold12'>{label}</Typography>
            </Box>
            <Box sx={{width: '65%'}}>
                {children}
            </Box>
        </Box>
    );
}

export const ConstructorTab: FunctionComponent = () => {
    const [invoiceItem, setInvoiceItem] = useState<Invoice>({} as Invoice);

    const dateFormat = "yyyy-MM-dd'T'HH:mm:ss";

    return (
        <Box borderRadius="6px" overflow='hidden'>
            <Box className={classNames(styles.container)}>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', rowGap: '18px'}}>
                    <Box>
                        <Typography className='bold30' textAlign='center'>
                            Invoice creation form
                        </Typography>
                    </Box>
                    <CustomDivider/>
                    <ConstructorRow label='Visibility:'>
                        <RadioGroup
                            aria-label="options"
                            name="options"
                            defaultValue='public'
                        >
                            <StyledFormControlLabel
                                value="private"
                                control={<StyledRadio/>}
                                label="Private"
                            />
                            <StyledFormControlLabel
                                value="public"
                                control={<StyledRadio/>}
                                label="Public"
                            />
                        </RadioGroup>
                    </ConstructorRow>
                    <ConstructorRow label='Type:'>
                        <RadioGroup
                            aria-label="options"
                            name="options"
                            value={invoiceItem?.type}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, type: e.target.value} as Invoice);
                            }}
                            defaultValue='invoice'
                        >
                            <StyledFormControlLabel
                                value="invoice"
                                control={<StyledRadio/>}
                                label="Invoice"
                            />
                            <StyledFormControlLabel
                                value="listing"
                                control={<StyledRadio/>}
                                label="Catalog item"
                            />
                            <StyledFormControlLabel
                                value="custom_contract"
                                control={<StyledRadio/>}
                                label="Custom contract"
                            />
                            <StyledFormControlLabel
                                value="payroll"
                                control={<StyledRadio/>}
                                label="Payroll"
                            />
                            <StyledFormControlLabel
                                value="multisig_invoice"
                                control={<StyledRadio/>}
                                label="Multisig invoice"
                            />
                        </RadioGroup>
                    </ConstructorRow>
                    <ConstructorRow label='Title:'>
                        <InputBase
                            className={classNames(styles.input, "bold12")}
                            type="text"
                            value={invoiceItem?.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, title: e.target.value} as Invoice);
                            }}
                        />
                    </ConstructorRow>
                    <ConstructorRow label='Description:'>
                        <InputBase
                            className={classNames(styles.input, "bold12")}
                            type="text"
                            value={invoiceItem?.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, description: e.target.value} as Invoice);
                            }}
                        />
                    </ConstructorRow>
                    <ConstructorRow label='Image url:'>
                        <InputBase
                            className={classNames(styles.input, "bold12")}
                            type="text"
                            value={invoiceItem?.imageUrl}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, imageUrl: e.target.value} as Invoice);
                            }}
                        />
                    </ConstructorRow>
                    <ConstructorRow label='Requester:'>
                        <InputBase
                            className={classNames(styles.input, "bold12")}
                            type="text"
                            value={invoiceItem?.requester?.address}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, requester: {address: e.target.value}} as Invoice);
                            }}
                        />
                    </ConstructorRow>
                    <ConstructorRow label='Receivers:'>
                        <InputBase
                            className={classNames(styles.input, "bold12")}
                            type="text"
                            value={invoiceItem?.receiver?.address}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, receiver: {address: e.target.value}} as Invoice);
                            }}
                        />
                    </ConstructorRow>
                    <ConstructorRow label='Payers emails:'>
                        <InputBase
                            className={classNames(styles.input, "bold12")}
                            type="text"
                            value={invoiceItem?.payerEmail?.address}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, payerEmail: {address: e.target.value}} as Invoice);
                            }}
                        />
                    </ConstructorRow>
                    <ConstructorRow label='Payers wallets:'>
                        <InputBase
                            className={classNames(styles.input, "bold12")}
                            type="text"
                            value={invoiceItem?.payerWallet?.address}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, payerWallet: {address: e.target.value}} as Invoice);
                            }}
                        />
                    </ConstructorRow>
                    <ConstructorRow label='Requested token:'>
                        <Box sx={{width: '100%', height: '40px'}}>
                            <AssetSelector selectedAsset={invoiceItem?.requestedAsset}
                                           updateSelectedAsset={(asset: Asset) => {
                                               setInvoiceItem({...invoiceItem, requestedAsset: asset} as Invoice);
                                           }}
                            />
                        </Box>
                    </ConstructorRow>
                    <ConstructorRow label='Requested Amount:'>
                        <InputBase
                            className={classNames(styles.input, "bold12")}
                            type="number"
                            value={invoiceItem?.requestedAmount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                setInvoiceItem({...invoiceItem, requestedAmount: Number(e.target.value) || ''} as Invoice);
                            }}
                        />
                    </ConstructorRow>
                    <ConstructorRow label='Due date:'>
                        <input type='datetime-local' className={styles.dateInput} min="2020-12-31T00:00" max="2030-12-31T00:00" required={true}
                               value={invoiceItem?.dueDate}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                                   const date = new Date(e.target.value);
                                   setInvoiceItem({...invoiceItem, dueDate: format(date, dateFormat)} as Invoice);
                               }}
                        />
                    </ConstructorRow>
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                        <CommonButton width='300px' onClick={()=>console.log(invoiceItem)}>
                            <Typography className="bold16">Proceed to payment</Typography>
                        </CommonButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
