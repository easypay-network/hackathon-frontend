import React, {FunctionComponent} from "react";
import {Box, Container, Grid} from "@mui/material";

import styles from "./header.module.css";
import classNames from "classnames";
import Link from "next/link";
import Typography from "@mui/material/Typography";

interface Props {
    index: number;
}

export const Header: FunctionComponent<Props> = ({ index}) => {
    return (
<Box className={styles.background}>
    <Container sx={{
        display: 'flex'
    }}>
        <Grid container columnSpacing={0} height='80px' paddingLeft={0} paddingRight={0} columns={12}>
            <Grid item xs={12} md={12}
                  sx={{display: 'flex', justifyContent: 'flex-end', height: 'inherit', alignItems: 'center'}}>
                <Box className={styles.linkContainer}>
                    <Typography textAlign='center' className={classNames(styles.panelLink, index===0 && styles.selected, 'bold16')}>
                        <Link href="/catalog">
                            Catalog
                        </Link>
                    </Typography>
                    <Typography textAlign='center' className={classNames(styles.panelLink, index===1 && styles.selected, 'bold16')}>
                        <Link href="/payments">
                            Payments
                        </Link>
                    </Typography>
                    <Typography textAlign='center' className={classNames(styles.panelLink, index===2 && styles.selected, 'bold16')}>
                        <Link href="/swap">
                            Swap
                        </Link>
                    </Typography>
                    <Typography textAlign='center' className={classNames(styles.panelLink, index===3 && styles.selected, 'bold16')}>
                        <Link href="/integrations">
                            Integrations
                        </Link>
                    </Typography>
                    <Typography textAlign='center' className={classNames(styles.panelLink, index===4 && styles.selected, 'bold16')}>
                        <Link href="/about">
                            About
                        </Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </Container>
</Box>
    );
};