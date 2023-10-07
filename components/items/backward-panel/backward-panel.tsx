import React, {FunctionComponent} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import styles from "./backward-panel.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    children: React.ReactNode;
    onClick: ()=>void;
}

export const BackwardPanel: FunctionComponent<Props> = ({children, onClick}) => {
    return (
        <Box className={styles.panelContainer}>
            <IconButton className={styles.backIcon}
                        component="label"
                        onClick={onClick}>
                <ArrowBackIcon sx={{width:'40px', height:'40px'}}/>
            </IconButton>
            <Box className={styles.panelTitle}>
                {children}
            </Box>
        </Box>
    );
}