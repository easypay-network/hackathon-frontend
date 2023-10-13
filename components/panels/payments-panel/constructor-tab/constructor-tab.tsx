import React, {FunctionComponent, useState} from "react";
import {Box, FormControlLabel, InputBase, Radio, RadioGroup, styled, Typography} from "@mui/material";
import styles from "./constructor-tab.module.css";
import classNames from "classnames";
import {format} from "date-fns";
import {CommonButton} from "../../../buttons";
import {Asset, Invoice} from "../../../types";
import {AssetSelector, CustomDivider, CustomGridRow, InformationContainer} from "../../../items";
import axios from "axios";
import {apiUrl} from "../../../constants";
import {useRouter} from "next/router";

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

export const ConstructorTab: FunctionComponent = () => {
    const router = useRouter();

    const [formErrors, setFormErrors] = useState({
        title: false,
        imageUrl: false,
        requestedAmount: false,
        requestedAsset: false,
        receiver: false,
    });

    const validateInvoice = (invoice: Invoice) => {
        const errors: any = {};
        if (!invoice.title) {
            errors.title = true;
        }
        if (!invoice.imageUrl) {
            errors.imageUrl = true;
        }
        if (!invoice.requestedAmount) {
            errors.requestedAmount = true;
        }
        if (!invoice.requestedAsset) {
            errors.requestedAsset = true;
        }
        if (!invoice.receiver) {
            errors.receiver = true;
        }

        return errors;
    };

    const handleSubmitInvoice = () => {
        const validationErrors = validateInvoice(invoiceItem);
        setFormErrors(validationErrors);

        if (Object.values(validationErrors).some((element) => element === true)) {
            return;
        }

        const newInvoice = {
            ...invoiceItem,
            status: 'pending',
            creationDate: format(new Date(), dateFormat),
            type: 'invoice',
            direction: 'INCOMING'
        }

        setInvoiceItem(newInvoice as Invoice);

        axios.post(`${apiUrl}/invoices`, newInvoice)
            .then((response) => {
                router.push({
                        pathname: '/payments/invoices/[invoice]',
                        query: {
                            invoice: response.data.identity
                        }
                    },
                    `/payments/invoices/${response.data.identity}`,
                    {shallow: true});
            })
            .catch((error) => console.error(error));
    }

    const [invoiceItem, setInvoiceItem] = useState<Invoice>({} as Invoice);

    const dateFormat = "yyyy-MM-dd'T'HH:mm:ss";

    return (
        <InformationContainer padding="20px 150px">
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', rowGap: '18px'}}>
                <Box>
                    <Typography className='bold30' textAlign='center'>
                        Invoice creation form
                    </Typography>
                </Box>
                <CustomDivider/>
                <CustomGridRow label='Visibility:'>
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
                </CustomGridRow>
                <CustomGridRow label='Type:'>
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
                </CustomGridRow>
                <CustomGridRow label='Title:'>
                    <InputBase
                        className={classNames(styles.input, "bold12")}
                        type="text"
                        value={invoiceItem?.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                            if (e.target.value) {
                                setFormErrors({...formErrors, title: false});
                            }
                            setInvoiceItem({...invoiceItem, title: e.target.value} as Invoice);
                        }}
                    />
                    <Typography className={classNames(styles.invalidInput, "bold12")}>
                        {formErrors.title && "Value is required"}
                    </Typography>
                </CustomGridRow>
                <CustomGridRow label='Description:'>
                    <InputBase
                        className={classNames(styles.input, "bold12")}
                        type="text"
                        value={invoiceItem?.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                            setInvoiceItem({...invoiceItem, description: e.target.value} as Invoice);
                        }}
                    />
                </CustomGridRow>
                <CustomGridRow label='Image url:'>
                    <InputBase
                        className={classNames(styles.input, "bold12")}
                        type="text"
                        value={invoiceItem?.imageUrl}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                            if (e.target.value) {
                                setFormErrors({...formErrors, imageUrl: false});
                            }
                            setInvoiceItem({...invoiceItem, imageUrl: e.target.value} as Invoice);
                        }}
                    />
                    <Typography className={classNames(styles.invalidInput, "bold12")}>
                        {formErrors.imageUrl && "Value is required"}
                    </Typography>
                </CustomGridRow>
                <CustomGridRow label='Requester:'>
                    <InputBase
                        className={classNames(styles.input, "bold12")}
                        type="text"
                        value={invoiceItem?.requester?.address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                            setInvoiceItem({...invoiceItem, requester: {address: e.target.value}} as Invoice);
                        }}
                    />
                </CustomGridRow>
                <CustomGridRow label='Receivers:'>
                    <InputBase
                        className={classNames(styles.input, "bold12")}
                        type="text"
                        value={invoiceItem?.receiver?.address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                            if (e.target.value) {
                                setFormErrors({...formErrors, receiver: false});
                            }
                            setInvoiceItem({...invoiceItem, receiver: {address: e.target.value}} as Invoice);
                        }}
                    />
                    <Typography className={classNames(styles.invalidInput, "bold12")}>
                        {formErrors.receiver && "Value is required"}
                    </Typography>
                </CustomGridRow>
                <CustomGridRow label='Payers emails:'>
                    <InputBase
                        className={classNames(styles.input, "bold12")}
                        type="text"
                        value={invoiceItem?.payerEmail?.address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                            setInvoiceItem({...invoiceItem, payerEmail: {address: e.target.value}} as Invoice);
                        }}
                    />
                </CustomGridRow>
                <CustomGridRow label='Payers wallets:'>
                    <InputBase
                        className={classNames(styles.input, "bold12")}
                        type="text"
                        value={invoiceItem?.payerWallet?.address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                            setInvoiceItem({...invoiceItem, payerWallet: {address: e.target.value}} as Invoice);
                        }}
                    />
                </CustomGridRow>
                <CustomGridRow label='Requested token:'>
                    <Box sx={{width: '100%', height: '40px'}}>
                        <AssetSelector selectedAsset={invoiceItem?.requestedAsset}
                                       updateSelectedAsset={(asset: Asset) => {
                                           if (asset) {
                                               setFormErrors({...formErrors, requestedAsset: false});
                                           }
                                           setInvoiceItem({...invoiceItem, requestedAsset: asset} as Invoice);
                                       }}
                        />
                    </Box>
                    <Typography className={classNames(styles.invalidInput, "bold12")}>
                        {formErrors.requestedAsset && "Value is required"}
                    </Typography>
                </CustomGridRow>
                <CustomGridRow label='Requested Amount:'>
                    <InputBase
                        className={classNames(styles.input, "bold12")}
                        type="number"
                        value={invoiceItem?.requestedAmount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                            if (e.target.value) {
                                setFormErrors({...formErrors, requestedAmount: false});
                            }
                            setInvoiceItem({...invoiceItem, requestedAmount: Number(e.target.value) || ''} as Invoice);
                        }}
                    />
                    <Typography className={classNames(styles.invalidInput, "bold12")}>
                        {formErrors.requestedAmount && "Value is required"}
                    </Typography>
                </CustomGridRow>
                <CustomGridRow label='Due date:'>
                    <input type='datetime-local' className={styles.dateInput} min="2020-12-31T00:00" max="2030-12-31T00:00" required={true}
                           value={invoiceItem?.dueDate}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                               const date = new Date(e.target.value);
                               setInvoiceItem({...invoiceItem, dueDate: format(date, dateFormat)} as Invoice);
                           }}
                    />
                </CustomGridRow>
                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <CommonButton width='300px' onClick={handleSubmitInvoice}>
                        <Typography className="bold16">Proceed to payment</Typography>
                    </CommonButton>
                </Box>
            </Box>
        </InformationContainer>


    );
}
