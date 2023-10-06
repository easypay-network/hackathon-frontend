import {NextPage} from "next";
import {PageLayout} from "../../../components/layouts";
import {PaymentsPanel} from "../../../components/panels/payments-panel";

const ReportsPage: NextPage = () => {
    return (
        <PageLayout index={1}>
            <PaymentsPanel index={4}/>
        </PageLayout>
    )
}

export default ReportsPage;