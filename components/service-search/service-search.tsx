import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './service-search.module.css';
import axios from 'axios';
import {useRouter} from "next/router";
import {apiUrl} from "../constants"

interface Category {
    product: {
        title: string;
        identity: number;
    };
    category: {
        name: string;
    };
}
interface Invoices {
    title: string,
    identity: number,
}

export const ServiceSearch: FunctionComponent = () => {
    const [serviceCode, setServiceCode] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [invoices, setInvoices] = useState<Invoices[]>([]);
    const transformInvoices = (invoices: Invoices[]) => {
        return invoices.map(function (invoice) {
            return {
                'product' :
                    {
                        title: invoice.title,
                        identity: invoice.identity,
                    },
                'category' : {
                    name: 'Invoices',
                }
            }
        })
    }
    const transformedInvoices = transformInvoices(invoices)
    const searchItems = [...categories, ...transformedInvoices]
    const router = useRouter()
    const searchNavigation = (item: { category: { name: any; }; product: { identity: any; }; }) => {
        if(item.category.name === 'Invoices') {
            router.push(
                {
                    pathname: '/payments/invoices/[invoice]',
                    query: {
                        identity: item.product.identity,
                    },
                },
                `/payments/invoices/${item.product.identity}`,
                { shallow: true }
            );
        } else {
            router.push(
                {
                    pathname: '/catalog/[category]/[product]',
                    query: {
                        category: item.category.name,
                        identity: item.product.identity,
                    },
                },
                `/catalog/${(item.category.name).toLowerCase()}/${item.product.identity}`,
                { shallow: true }
            );
        }
    };

    const handleFocus = () => {
        setIsVisible(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsVisible(false), 400);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${apiUrl}/catalog/products-categories`
                );
                setCategories([...response.data]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${apiUrl}/invoices`
                );
                setInvoices([...response.data]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const filteredItems = searchItems.filter(
        (item) =>
            item.product.identity.toString().includes(serviceCode) ||
            item.product.title.toLowerCase().includes(serviceCode) ||
            item.category.name.toLowerCase().includes(serviceCode)
    );

    return (
        <div className={styles.container}>
            <input
                value={serviceCode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setServiceCode(event.target.value);
                }}
                className={styles.customInput}
                placeholder="Search by service code"
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {isVisible && (
                <div>
                    <ul className={styles.ul}>
                        {filteredItems.map((item) => (
                            <li key={item.product.identity} onClick={() => searchNavigation(item)}>
                                    <div className={styles.searchItems}>
                                        <span>{item.product.title}</span>
                                        <span>{item.category.name}</span>
                                        <span>#{item.product.identity}</span>
                                    </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};