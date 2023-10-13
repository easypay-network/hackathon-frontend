import React, {FunctionComponent, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import {Product} from "../../../types";
import {apiUrl} from "../../../constants";
import {
    BackwardPanel,
    CustomDivider,
    CustomGridRow,
    InformationContainer, LoadingItem,
    TokenAmountItem
} from "../../../items";
import Utils from "../../../utils/utils";
import {CommonButton} from "../../../buttons";
import styles from "./product-item-panel.module.css";
import {format} from "date-fns";

export const ProductItemPanel: FunctionComponent = () => {
    const router = useRouter();

    const {category, product} = router.query;

    const [productItem, setProductItem] = useState<Product>();

    useEffect(() => {
        if (!product) {
            return
        }

        axios.get(`${apiUrl}/catalog/products/${product}`)
            .then((response) => {
                setProductItem(response.data);
            })
            .catch((error) => console.error(error));
    }, [product]);

    const dateFormat = "yyyy-MM-dd'T'HH:mm:ss";

    const handleCheckOut = () => {
        const newInvoice = {
            ...productItem,
            identity: undefined,
            status: 'pending',
            creationDate: format(new Date(), dateFormat),
            type: 'invoice',
            direction: 'INCOMING'
        }

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

    return (
        <>
        <Box sx={{width: '100%'}}>
            <BackwardPanel onClick={() => router.push(`/catalog/${category}`)}>
                <Typography textAlign='left' className='bold16'  color='rgba(136, 136, 136, 1)'>
                    {Utils.capitalizeString(category as string)}:
                </Typography>
                <Typography textAlign='left' className='bold20'>
                    #{product}
                </Typography>
            </BackwardPanel>
            {!productItem ? <LoadingItem/> :
                <InformationContainer padding='25px'>
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '70%', rowGap: '14px'}}>
                        <CustomGridRow label="Title:">
                            <Typography className='bold30'>
                                {productItem?.title}
                            </Typography>
                        </CustomGridRow>
                        <CustomGridRow label="Service id:">
                            <Box sx={{display: 'flex', alignItems: 'flex-end', width: '75%'}}>
                                <Typography className='bold12'>#</Typography>
                                <Typography className='bold20'>{productItem?.identity}</Typography>
                            </Box>
                        </CustomGridRow>
                        <CustomGridRow label="Description:">
                            <Typography className='bold30'>
                                <Typography className='bold20'>{productItem?.description}</Typography>
                            </Typography>
                        </CustomGridRow>
                        <CustomDivider/>
                        <CustomGridRow label="Requester:">
                            <Typography className='bold12'>
                                {productItem?.requester?.address}
                            </Typography>
                        </CustomGridRow>
                        <CustomGridRow label="Receivers:">
                            <Typography className='bold12'>
                                {productItem?.receiver?.address}
                            </Typography>
                        </CustomGridRow>
                        <CustomGridRow label='Requested:'>
                            <TokenAmountItem tokenAsset={productItem?.requestedAsset}
                                             tokenAmount={productItem?.requestedAmount}/>
                        </CustomGridRow>
                        <CustomDivider/>
                        <CustomGridRow label="Creation date:">
                            {productItem?.creationDate &&
                                <Typography className='bold12'>
                                    {productItem.creationDate.split("T")[1]}&nbsp;{productItem.creationDate.split("T")[0]}
                                </Typography>
                            }
                        </CustomGridRow>
                        <CustomGridRow label="Due date:">
                            {productItem?.dueDate &&
                                <Typography className='bold12'>
                                    {productItem.dueDate.split("T")[1]}&nbsp;{productItem.dueDate.split("T")[0]}
                                </Typography>
                            }
                        </CustomGridRow>
                        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                            <CommonButton width='250px' onClick={handleCheckOut}>
                                <Typography className="bold16">Check out</Typography>
                            </CommonButton>
                        </Box>
                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'column', width: '30%', padding: '0 30px'}}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "30px",
                            marginBottom: "70px"
                        }}>
                            <img src={productItem?.imageUrl} className={styles.productImage}/>
                        </Box>
                    </Box>
                </InformationContainer>
            }
        </Box>
    </>
    );
}