import {PageLayout} from '../components/layouts';
import {NextPage} from "next";
import {Container} from "@mui/material";
import * as React from "react";

const HomePage: NextPage = () => {
    return (
        <PageLayout index={-1}>
            <Container sx={{
                mt: 5, mb: 5,
                p: 0,
                display: 'flex',
                overflow: 'none',
                height: '100%',
                maxWidth: 'none'
            }}>
            </Container>
        </PageLayout>
    )
}

export default HomePage;