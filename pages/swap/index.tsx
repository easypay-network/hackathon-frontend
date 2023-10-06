import {NextPage} from "next";
import {PageLayout} from "../../components/layouts";
import SwapPanel from "../../components/panels/swap-panel/swap-panel";

const SwapPage: NextPage = () => {
    return (
        <PageLayout index={2}>
            <SwapPanel/>
        </PageLayout>
    )
}

export default SwapPage;