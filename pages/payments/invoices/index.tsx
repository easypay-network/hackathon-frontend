import {NextPage} from "next";
import {PageLayout} from "../../../components/layouts";
import {PaymentsPanel, InvoiceListTab} from "../../../components/panels/payments-panel";

const InvoicesPage: NextPage = () => {
    return (
        <PageLayout index={1}>
            <PaymentsPanel index={1}>
                <InvoiceListTab/>
            </PaymentsPanel>
        </PageLayout>
    )
}

export default InvoicesPage;