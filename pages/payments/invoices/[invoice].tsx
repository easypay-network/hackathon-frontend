import React from "react";
import {PageLayout} from "../../../components/layouts";
import {PaymentsPanel, InvoiceItemTab} from "../../../components/panels/payments-panel";

export default function InvoicePage() {
    return (
        <PageLayout index={1}>
            <PaymentsPanel index={1}>
                <InvoiceItemTab/>
            </PaymentsPanel>
        </PageLayout>
    )
}