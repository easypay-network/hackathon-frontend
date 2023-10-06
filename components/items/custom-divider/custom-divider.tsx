import React, {FunctionComponent} from "react";
import {Divider} from "@mui/material";
import styles from "./custom-divider.module.css";

export const CustomDivider: FunctionComponent = () => {
    return (
        <Divider className={styles.divider}/>
    );
}