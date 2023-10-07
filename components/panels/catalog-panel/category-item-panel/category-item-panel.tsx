import React, {FunctionComponent, useEffect, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import {apiUrl} from "../../../constants";
import {BackwardPanel, PanelContainer} from "../../../items";
import capitalizeString from "../../../utils";
import {Product} from "../../../types";
import {ProductItem} from "./product-item/product-item";

export const CategoryItemPanel: FunctionComponent = () => {
    const router = useRouter();

    const {category} = router.query;

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (!category) {
            return
        }

        axios.get(`${apiUrl}/catalog/categories/${category}/products`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error(error));
    }, [category]);

    return (
        <Box sx={{width: '100%'}}>
            <BackwardPanel onClick={() => router.push(`/catalog`)}>
                <Typography textAlign='left' className='bold40'>
                    {capitalizeString(category as string)}
                </Typography>
            </BackwardPanel>

            <PanelContainer padding="50px">
                <Grid container columnSpacing={3} rowSpacing={5} columns={12}>
                    {products.map((product, index) => {
                        return (
                            <Grid key={product.identity} item xs={4} justifyContent='space-around'>
                                <ProductItem product={product}
                                             onSelect={() => router.push({
                                                     pathname: '/catalog/[category]/[product]',
                                                     query: {
                                                         category: category,
                                                         product: product.identity
                                                     }
                                                 },
                                                 `/catalog/${category}/${product.identity}`,
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