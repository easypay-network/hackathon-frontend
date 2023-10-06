import React, {FunctionComponent} from "react";

import styles from "./panel-item.module.css";
import {Box, Button, Typography} from "@mui/material";

interface Props {
    onSelectItem: () => void;
    itemLogo: string;
    itemName: string;
}

export const PanelItem: FunctionComponent<Props> = ({itemName, itemLogo, onSelectItem}) => {
    return (
        <Button className={styles.panelItem} onClick={onSelectItem}>
            <Box sx={{
                display: 'flex',
                alignItem: 'center',
                padding: '0px'
            }}
                 className={styles.imageContainer}
            >
                <Box
                    component="img"
                    src={itemLogo}
                    className={styles.image}
                />
                <Box className={styles.imageText}>
                    <Typography className="bold16">
                        {itemName}
                    </Typography>
                </Box>
            </Box>
        </Button>
    );
}