import {createTheme, ThemeProvider} from "@mui/system";
import {Box, Typography} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import React, {FunctionComponent} from "react";
import {InvoiceStatus} from "../../../../types";

const invoiceStatusTheme = createTheme({
    palette: {
        warning: {
            main: 'rgba(252, 255, 92, 1)',
        },
        success: {
            main: 'rgba(98, 255, 161, 1)',
        },
        error: {
            main: 'rgba(255, 83, 83, 1)',
        },
    },
});

interface Props {
    status?: InvoiceStatus;
}

export const InvoiceStatusItem : FunctionComponent<Props> = ({status}) => {
    return (
        <ThemeProvider theme={invoiceStatusTheme}>
            {status === 'pending' &&
                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                    <Typography className='bold12'>Pending</Typography>
                    <CircleIcon color='warning' sx={{width:14, height:14}}/>
                </Box>
            }
            {status === 'resolved' &&
                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                    <Typography className='bold12'>Resolved</Typography>
                    <CircleIcon color='success' sx={{width:14, height:14}}/>
                </Box>
            }
            {status === 'rejected' &&
                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                    <Typography className='bold12'>Rejected</Typography>
                    <CircleIcon color='error' sx={{width:14, height:14}}/>
                </Box>
            }
        </ThemeProvider>
    );
}
