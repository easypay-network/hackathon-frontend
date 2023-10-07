import React, {FunctionComponent} from "react";
import {Product} from "../../../../types";
import styles from "./product-item.module.css";
import {Box, Button, Typography} from "@mui/material";

interface Props {
    product: Product;
    onSelect: () => void;
}

export const ProductItem: FunctionComponent<Props> = ({product, onSelect}) => {
    return (
        <Button className={styles.productItem} onClick={onSelect}>
            <Box className={styles.container}>
                <img src={product?.imageUrl} width='90px' height='115px'/>
                <Box className={styles.itemBody}>
                    <Typography className='bold20'>
                        {product.title}
                    </Typography>
                    <Typography className='medium12'>
                        #{product.identity}
                    </Typography>
                    <Typography className='medium10'>
                        {product.description}
                    </Typography>
                    <Box sx={{display:'flex'}}>
                        <Box sx={{display: 'flex', alignItems:'center'}}>
                            <img src={product?.requestedAsset?.logoUrl}
                                 alt={product?.requestedAsset?.ticker || product?.requestedAsset?.originalTicker}
                                 width='28px' height='28px'/>
                            <Typography className='medium10' marginLeft='5px'>
                                Zone
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems:'center', marginLeft:'12px'}}>
                            <img src={product?.requestedAsset?.locatedZone?.logoUrl}
                                 alt={product?.requestedAsset?.locatedZone?.name}
                                 width='28px' height='28px'/>
                            <Typography className='medium10' marginLeft='5px'>
                                Token
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Button>
    );
}