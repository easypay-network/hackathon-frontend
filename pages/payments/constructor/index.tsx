import {NextPage} from "next";
import {PageLayout} from "../../../components/layouts";
import {PaymentsPanel} from "../../../components/panels/payments-panel";

const ConstructorPage: NextPage = () => {
    return (
        <PageLayout index={1}>
            <PaymentsPanel index={2}/>
        </PageLayout>
    )
}

export default ConstructorPage;