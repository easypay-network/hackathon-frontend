import {NextPage} from "next";
import React from "react";
import {PageLayout} from "../../../components/layouts";
import {PaymentsPanel} from "../../../components/panels/payments-panel";
import ReportItem from "../../../components/panels/payments-panel/report-item/report-item";


const DynamicReport: NextPage = () => {
    return (
        <PageLayout index={1}>
            <PaymentsPanel index={4}>
                <ReportItem />
            </PaymentsPanel>
        </PageLayout>
    )
}

export default DynamicReport;