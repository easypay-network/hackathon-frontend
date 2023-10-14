import React, {FunctionComponent} from "react";
import Button from '@mui/material/Button';

import styles from "./common-button-custom.module.css";
import classNames from "classnames";

interface Props {
    children: React.ReactNode;
    onClick: Function;
    width?: string;
    className?: string;
    disabled?: boolean;
}

export const CommonButtonCustom: FunctionComponent<Props> = ({children, onClick, width='160px', className, disabled}) => {
    return (
        <Button variant="contained"
                disabled={disabled}
                sx={{width: width, '&& .MuiTouchRipple-rippleVisible': {
                        scale: '89%',
                    },}}
                className={classNames(className ? className : styles.commonButton, styles.button)}
                onClick={()=>onClick()}
                centerRipple={true}
        >
            {children}
        </Button>
    );
}