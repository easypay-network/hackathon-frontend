import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./custom-grid-row.module.css";

interface Props {
    label: string;
    children?: React.ReactNode;
}

export const CustomGridRow: FunctionComponent<Props> = ({label, children}) => {
    return (
        <Box className={styles.customRow}>
            <Box className={styles.customLabel}>
                <Typography className='bold12'>{label}</Typography>
            </Box>
            <Box className={styles.customBody}>
                {children}
            </Box>
        </Box>
    );
}