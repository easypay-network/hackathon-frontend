import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import {Asset} from "../../types";
import {AssetSelector} from "../asset-selector";

interface Props {
    tokenAsset?: Asset;
    tokenAmount?: number;
    disabledSelect?: boolean,
    handleTokenChange?: (token: Asset) => void;
}

export const TokenAmountItem: FunctionComponent<Props> = ({
    tokenAsset,
    tokenAmount,
    disabledSelect = true,
    handleTokenChange = () => {}
}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', columnGap: '20px'}}>
            <Box>
                <Typography className='bold12' paddingLeft='5px'>Token</Typography>
                {disabledSelect ?
                    <Box sx={{
                        width: 280,
                        height: 30,
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 1)',
                        color: 'rgba(24, 24, 24, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 10px',
                        marginBottom: '16px',
                        columnGap: '10px'
                    }}>
                        {tokenAsset && tokenAsset?.locatedZone?.name &&
                            <>
                                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '6px'}}>
                                    <img src={tokenAsset.logoUrl} width='18px' height='18px'/>
                                    <Typography className='bold10' textTransform='uppercase'>
                                        {tokenAsset.ticker || tokenAsset.originalTicker}
                                    </Typography>
                                </Box>
                                <Typography className='medium10' color='rgba(136, 136, 136, 1)'>
                                    on
                                </Typography>
                                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '6px'}}>
                                    <img src={tokenAsset.locatedZone.logoUrl} width='18px' height='18px'/>
                                    <Typography className='medium10' textTransform='capitalize'>
                                        {tokenAsset.locatedZone.name}
                                    </Typography>
                                </Box>
                            </>
                        }
                    </Box>
                    :
                    <Box sx={{width: 280, height: 30}}>
                        <AssetSelector selectedAsset={tokenAsset} updateSelectedAsset={handleTokenChange} />
                    </Box>
                }
            </Box>
            <Box>
                <Typography className='bold12' paddingLeft='5px'>Amount</Typography>
                <Box sx={{
                    width: 100,
                    height: 30,
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 1)',
                    color: 'rgba(24, 24, 24, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 10px',
                }}>
                    <Typography className='bold12' overflow='hidden' textOverflow='ellipsis'>
                        {tokenAmount}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}