import React, {FunctionComponent} from "react";
import {Box} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabPanel: FunctionComponent<TabPanelProps> = ({children, value, index}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}