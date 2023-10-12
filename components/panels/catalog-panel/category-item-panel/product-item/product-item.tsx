import React, {FunctionComponent} from "react";
import {Product} from "../../../../types";
import styles from "./product-item.module.css";
import {Box, Button, Typography} from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Utils from "../../../../utils/utils"

interface Props {
    product: Product;
    onSelect: () => void;
}

export const ProductItem: FunctionComponent<Props> = ({product, onSelect}) => {

    return (
        <Button className={styles.productItem} onClick={onSelect}>
            <Box className={styles.container}>
                <img className={styles.productImage} src={product?.imageUrl} width='90px' height='115px'/>
                <Box className={styles.itemBody}>
                    <Typography className='productTitle20'>
                        {product.title}
                    </Typography>
                    <Typography className='productIdentity10'>
                        #{product.identity}
                    </Typography>
                    <Typography className='productDescription10'>
                        {Utils.transformDescription(product.description)}
                    </Typography>
                    <Box sx={{display:'flex'}}>
                        <Box sx={{display: 'flex', alignItems:'center'}}>
                            <img src={product?.requestedAsset?.logoUrl}
                                 className={styles.assetIcon}
                                 alt={product?.requestedAsset?.ticker || product?.requestedAsset?.originalTicker}
                                 width='26px' height='26px'/>
                            <Typography className='productDescription10' marginLeft='3px'>
                                Token
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems:'center', marginLeft:'10px'}}>
                            <img src={product?.requestedAsset?.locatedZone?.logoUrl}
                                 className={styles.assetIcon}
                                 alt={product?.requestedAsset?.locatedZone?.name}
                                 width='26px' height='26px'/>
                            <Typography className='productDescription10' marginLeft='3px'>
                                Blockchain
                            </Typography>
                        </Box>
                        <ArrowOutwardIcon sx={{position: 'absolute', bottom: '12px', right: '12px'}}/>
                    </Box>
                </Box>
            </Box>
        </Button>
    );
}