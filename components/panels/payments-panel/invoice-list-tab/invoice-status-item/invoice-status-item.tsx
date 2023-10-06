import React, {FunctionComponent} from "react";
import {createTheme, ThemeProvider} from "@mui/system";
import {Box, Typography} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {InvoiceStatus} from "../../../../types";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

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
                <Box>
                    <CircleIcon color='warning'/>
                    <Typography className='bold12'>Pending</Typography>
                </Box>
            }
            {status === 'resolved' &&
                <Box>
                    <DoneIcon color='success'/>
                    <Typography className='bold12'>Resolved</Typography>
                </Box>
            }
            {status === 'rejected' &&
                <Box>
                    <CloseIcon color='error'/>
                    <Typography className='bold12'>Rejected</Typography>
                </Box>
            }
        </ThemeProvider>
    );
}
