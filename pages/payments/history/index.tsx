import {NextPage} from "next";
import {PageLayout} from "../../../components/layouts";
import {PaymentsPanel} from "../../../components/panels/payments-panel";

const PaymentsPage: NextPage = () => {
    return (
        <PageLayout index={1}>
            <PaymentsPanel index={3}/>
        </PageLayout>
    )
}

export default PaymentsPage;