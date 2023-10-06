import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./catalog-panel.module.css";
import classNames from "classnames";
import {Box, Grid, Typography} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import {Category} from "../../types";
import {apiUrl} from "../../constants";
import {PanelItem} from "../../items";
import {PanelContainer} from "../../items/panel-container";

export const CatalogPanel: FunctionComponent = () => {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios.get(`${apiUrl}/catalog/categories`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{marginLeft: '100px', marginBottom: '20px'}}>
                <Typography textAlign='left' className={classNames(styles.panelTitle, 'bold40')}>
                    Catalog
                </Typography>
            </Box>

            <PanelContainer padding="50px 90px">
                <Grid container columnSpacing={3} rowSpacing={5} columns={10}>
                    {categories.map((category, index) => {
                        return (
                            <Grid key={category.identity} item xs={2} justifyContent='space-around'>
                                <PanelItem itemName={category.name}
                                           itemLogo={category.imageUrl}
                                           onSelectItem={() => router.push({
                                                   pathname: '/catalog/[category]',
                                                   query: {
                                                       category: category.name.toLowerCase()
                                                   }
                                               },
                                               `/catalog/${category.name.toLowerCase()}`,
                                               {shallow: true})}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </PanelContainer>
        </Box>
    );
}