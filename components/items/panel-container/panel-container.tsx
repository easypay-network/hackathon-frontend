import React, {FunctionComponent} from "react";
import classNames from "classnames";
import styles from "./panel-container.module.css";
import { Box } from "@mui/material";

interface Props {
    children: React.ReactNode;
    padding: string;
}

export const PanelContainer: FunctionComponent<Props> = ({children, padding}) => {
    return (
        <Box className={classNames(styles.container)} padding={padding}>
            {children}
        </Box>
    );
}