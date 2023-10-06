import React, {FunctionComponent} from "react";
import classNames from "classnames";
import styles from "./information-container.module.css";
import { Box } from "@mui/material";

interface Props {
    children: React.ReactNode;
    padding: string;
}

export const InformationContainer: FunctionComponent<Props> = ({children, padding}) => {
    return (
        <Box borderRadius="6px" overflow='hidden'>
            <Box className={classNames(styles.container)} padding={padding}>
                {children}
            </Box>
        </Box>
    );
}