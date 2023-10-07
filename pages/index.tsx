import * as React from "react";
import {NextPage} from "next";
import {PageLayout} from '../components/layouts';
import MainPagePanel from "../components/panels/main-page-panel/main-page-panel";

const HomePage: NextPage = () => {
    return (
        <PageLayout index={-1}>
            <MainPagePanel/>
        </PageLayout>
    )
}

export default HomePage;