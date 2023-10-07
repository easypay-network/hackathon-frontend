import React from "react";
import {PageLayout} from "../../components/layouts";
import {CategoryItemPanel} from "../../components/panels/catalog-panel";

export default function CategoryPage() {
    return (
        <PageLayout index={0}>
            <CategoryItemPanel/>
        </PageLayout>
    );
}