import React, {FunctionComponent} from "react";
import classNames from "classnames";
import styles from "./information-container.module.css";
import { Box } from "@mui/material";

interface Props {
    children: React.ReactNode;
}

export const InformationContainer: FunctionComponent<Props> = ({children}) => {
    return (
        <Box borderRadius="6px" overflow='hidden'>
            <Box className={classNames(styles.container)}>
                {children}
            </Box>
        </Box>
    );
}