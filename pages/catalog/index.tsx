import {NextPage} from "next";
import {PageLayout} from "../../components/layouts";
import {CatalogPanel} from "../../components/panels/catalog-panel";

const CatalogPage: NextPage = () => {
    return (
        <PageLayout index={0}>
            <CatalogPanel/>
        </PageLayout>
    )
}

export default CatalogPage;