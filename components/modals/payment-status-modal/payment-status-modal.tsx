import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import {CommonButton} from "../../buttons";
import {CommonModal} from "../common-modal";

interface Props {
    children: React.ReactNode;
    modalContainerStyle: string;
    open: boolean;
    setOpen: Function;
}

export const PaymentStatusModal: FunctionComponent<Props> = ({children, modalContainerStyle, open, setOpen}) => {
    return (
        <CommonModal modalContainerStyle={modalContainerStyle} open={open} setOpen={setOpen}>
            <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '14px'}}>
                {children}
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <CommonButton onClick={()=>setOpen(false)}>
                    <Typography className="bold16">Ok</Typography>
                </CommonButton>
            </Box>
        </CommonModal>
    );
}