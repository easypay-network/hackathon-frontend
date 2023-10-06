import React, {FunctionComponent, ReactNode} from "react";
import Button from '@mui/material/Button';

import styles from "./common-button.module.css";
import classNames from "classnames";

interface Props {
    children: ReactNode;
    onClick: Function;
    width?: string;
    className?: string;
    disabled?: boolean;
}

export const CommonButton: FunctionComponent<Props> = ({children, onClick, width='160px', className, disabled}) => {
    return (
        <Button variant="contained"
                disabled={disabled}
                sx={{width: width}}
                className={classNames(className ? className : styles.commonButton, styles.button)}
                onClick={()=>onClick()}
        >
            {children}
        </Button>
    );
}