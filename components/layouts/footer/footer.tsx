import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";

import styles from './footer.module.css';
import classNames from "classnames";

import gitLogo from "../../../public/gitLogo.svg";
import twitterLogo from "../../../public/twitterLogo.svg";
import Image from "next/image";

export const Footer: FunctionComponent = () => {
    return (
        <footer className={classNames(styles.footer)}>
            <Box className={styles.footerContainer}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography fontFamily="Inter" className="medium16">
                        Developed during
                    </Typography>
                    <Typography fontFamily="Inter"  className="bold16">
                        &nbsp;Hackathon 2023
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    columnGap: '2.5rem'
                }}>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/easypay-network">
                        <Image src={gitLogo.src} width='24px' height='24px'/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/easypay_network">
                        <Image src={twitterLogo.src} width='24px' height='24px'/>
                    </a>
                </Box>
            </Box>
        </footer>
    );
}