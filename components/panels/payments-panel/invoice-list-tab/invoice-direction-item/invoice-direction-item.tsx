import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import {InvoiceDirection} from "../../../../types";
import styles from "./invoice-direction-item.module.css";
import classNames from "classnames";

interface Props {
    direction?: InvoiceDirection;
}

export const InvoiceDirectionItem : FunctionComponent<Props> = ({direction}) => {
    return (
        <>
            {direction === 'INCOMING' &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                    alignItems: 'flex-end'
                }}>
                    <i className={styles.incomingLine}></i>
                    <Typography className={classNames(styles.lineLabel, 'bold12')}>
                        Incoming
                    </Typography>
                </Box>
            }
            {direction === 'OUTGOING' &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                    alignItems: 'flex-start'
                }}>
                    <i className={styles.outgoingLine}></i>
                    <Typography className={classNames(styles.lineLabel, 'bold12')}>
                        Outgoing
                    </Typography>
                </Box>
            }
            {direction === 'NEUTRAL' &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                    alignItems: 'center'
                }}>
                    <i className={styles.neutralLine}></i>
                    <Typography className={classNames(styles.lineLabel, 'bold12')}>
                        Neutral
                    </Typography>
                </Box>
            }
        </>
    );
}
