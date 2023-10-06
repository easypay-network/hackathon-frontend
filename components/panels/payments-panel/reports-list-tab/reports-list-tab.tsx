import React, {FunctionComponent} from "react";
import styles from "./reports-list-tab.module.css";
import {Box, Button, Grid, Typography} from "@mui/material";
import logo1 from "/public/reports-images/11.png"
import logo2 from "/public/reports-images/12.png"
import logo3 from "/public/reports-images/13.png"
import logo4 from "/public/reports-images/14.png"
import logo5 from "/public/reports-images/15.png"
import logo6 from "/public/reports-images/16.png"
import logo7 from "/public/reports-images/17.png"
import {useRouter} from "next/router";

const ReportsListTab: FunctionComponent = () => {
    const router = useRouter()
    const reportsClick = (reportName: string) => {
        router.push(
            {
                pathname: '/payments/reports/[report]',
                query: {
                    reportName,
                },
            },
            `/payments/reports/${reportName.toLowerCase()}`,
            { shallow: true }
        );
    }
    const reports = [
        "Payments report",
        "Unpaid pending invoice report",
        "Late invoice report",
        "Profit & loss report",
        "Sales tax report",
        "Capital gains report",
        "Transaction history report",
    ]

    const reportLogos = [
        logo1,
        logo2,
        logo3,
        logo4,
        logo5,
        logo6,
        logo7,
    ];

    const reportsData = reports.map((reportName, index) => ({
        name: reportName,
        logo: reportLogos[index],
    }));

    return (
        <Box>
            <Grid container columnSpacing={3} rowSpacing={5} columns={10}>
                {reportsData.map((report, index) => {
                    return (
                        <Grid key={`${report.name}-${index}`} item xs={2} justifyContent='space-around'>
                            <Button className={styles.categoryItem} onClick={() => reportsClick(report.name)}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItem: 'center',
                                    padding: '0px'
                                }}
                                     className={styles.imageContainer}
                                >
                                    <Box
                                        component="img"
                                        src={report.logo.src}
                                        className={styles.image}
                                    />
                                    <Box className={styles.imageText}>
                                        <Typography className="bold16">
                                            {report.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
export default ReportsListTab