import React, {FunctionComponent, ReactNode} from "react";
import {Footer} from "./footer";
import {Header} from "./header";
import {Box, Container} from "@mui/material";

import styles from "./layout.module.css";
import classNames from "classnames";

interface Props {
    children?: ReactNode;
    index: number;
}

export const PageLayout: FunctionComponent<Props> = ({children, index}) => {
    return (
        <Box className={classNames(styles.container)}>
            <Header index={index}/>
            <Container sx={{overflowY: 'none', display: 'flex', flexDirection: 'column', marginTop: '100px'}}>
                {children}
            </Container>
            <Footer/>
        </Box>
    );
}