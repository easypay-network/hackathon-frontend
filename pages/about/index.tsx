import {NextPage} from "next";
import {PageLayout} from "../../components/layouts";
import AboutPanel from "../../components/panels/about-panel/about-panel";

const AboutPage: NextPage = () => {
    return (
        <PageLayout index={4}>
            <AboutPanel/>
        </PageLayout>
    )
}

export default AboutPage;