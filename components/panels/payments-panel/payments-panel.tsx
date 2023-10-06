import React, {FunctionComponent, useState} from "react";

import styles from "./payments-panel.module.css";
import classNames from "classnames";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {TabPanel} from "./tap-panel";
import {useRouter} from "next/router";
import {ConstructorTab} from "./constructor-tab";
import {InvoiceListTab} from "./invoice-list-tab";

interface Props {
    children?: React.ReactNode;
    index: number;
}

export const PaymentsPanel: FunctionComponent<Props> = ({children, index}) => {
    const router = useRouter();

    const [tabIndex, setTabIndex] = useState<number>(index);

    return (
        <Box className={classNames(styles.container)} sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Tabs
                variant="fullWidth"
                sx={{marginTop: '40px', minWidth: '700px'}}
                value={tabIndex}
                onChange={(e, index) => setTabIndex(index)}
                TabIndicatorProps={{style: {width: 0}}}
            >
                <Tab className={tabIndex === 0 ? styles.selectedTab : styles.notSelectedTab}
                     label={<span className={classNames(styles.tabSpan, 'bold16')}>Dashboard</span>}
                     onClick={() => router.push('/payments/dashboards')}
                />
                <Tab className={tabIndex === 1 ? styles.selectedTab : styles.notSelectedTab}
                     label={<span className={classNames(styles.tabSpan, 'bold16')}>Invoices</span>}
                     onClick={() => router.push('/payments/invoices')}
                />
                <Tab className={tabIndex === 2 ? styles.selectedTab : styles.notSelectedTab}
                     label={<span className={classNames(styles.tabSpan, 'bold16')}>Constructor</span>}
                     onClick={() => router.push('/payments/constructor')}
                />
                <Tab className={tabIndex === 3 ? styles.selectedTab : styles.notSelectedTab}
                     label={<span className={classNames(styles.tabSpan, 'bold16')}>History</span>}
                     onClick={() => router.push('/payments/history')}
                />
                <Tab className={tabIndex === 4 ? styles.selectedTab : styles.notSelectedTab}
                     label={<span className={classNames(styles.tabSpan, 'bold16')}>Reports</span>}
                     onClick={() => router.push('/payments/reports')}
                />
            </Tabs>

            <Box sx={{width: '100%', height: '100%', padding: '20px 90px'}}>
                <TabPanel value={tabIndex} index={0}>
                    <Typography>Dashboard</Typography>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    {index === 1 && children || <InvoiceListTab/>}
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    {index === 2 && children || <ConstructorTab/>}
                </TabPanel>
                <TabPanel value={tabIndex} index={3}>
                    <Typography>History</Typography>
                </TabPanel>
                <TabPanel value={tabIndex} index={4}>
                    <Typography>Reports</Typography>
                </TabPanel>
            </Box>
        </Box>
    );
}