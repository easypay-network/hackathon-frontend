import React, {FunctionComponent} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import styles from "./connect-button.module.css";
import classNames from "classnames";
import {Typography} from "@mui/material";
import Image from "next/image";

interface Props {
    connected: boolean;
    logoUrl: string;
    onClick: Function;
    buttonName: string;
}

export const ConnectButton: FunctionComponent<Props> = ({connected, logoUrl, onClick, buttonName}) => {
    return (
        <Box maxWidth="sm">
            <Button variant="contained"
                    className={classNames(connected ? styles.connectedButton : styles.connectButton, styles.button)}
                    onClick={()=>onClick()}
                    disabled={connected}
                    centerRipple={true}
                    sx={{'&& .MuiTouchRipple-rippleVisible': {
                            scale: '89%',
                        }}}
            >
                <Image src={logoUrl} width='26px' height='26px'/>
                <Box paddingLeft='24px'>
                    <Typography className="medium14">
                        {buttonName}
                    </Typography>
                </Box>
            </Button>
        </Box>
    );
}