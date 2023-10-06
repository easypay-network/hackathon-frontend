import {NextPage} from "next";
import {PageLayout} from "../../../components/layouts";
import {PaymentsPanel} from "../../../components/panels/payments-panel";

const DashboardsPage: NextPage = () => {
    return (
        <PageLayout index={1}>
            <PaymentsPanel index={0}/>
        </PageLayout>
    )
}

export default DashboardsPage;