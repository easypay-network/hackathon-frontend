import React, {FC, useState, useEffect, useRef} from 'react';
import styles from "./SearchModal.module.css";
import {useRouter} from "next/router";
import axios from "axios";
import {apiUrl} from "../../constants";
import {SearchModalProps, Category, Invoices} from "../../types";
import Utils from "../../utils/utils"
import listIcon from "../../../public/listIcon.png"
import loading from "../../../public/searchLoading.svg"

const SearchModal:FC<SearchModalProps> = ({searchToggle, setSearchToggle}) => {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [serviceCode, setServiceCode] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [invoices, setInvoices] = useState<Invoices[]>([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true);
    const [isInvoicesLoading, setInvoicesLoading] = useState<boolean>(true);
    const toggleModal = () => {
        setSearchToggle(!searchToggle);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const transformedInvoices = Utils.transformInvoices(invoices)
    const searchItems = [...categories, ...transformedInvoices]
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
        setSearchToggle(false)
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${apiUrl}/catalog/products-categories`
                );
                setCategories([...response.data]);
                setIsCategoriesLoading(false);
            } catch (error) {
                console.error(error);
                setIsCategoriesLoading(false);
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
                setInvoicesLoading(false);
            } catch (error) {
                console.error(error);
                setInvoicesLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredItems = searchItems.filter(
        (item) =>
            item.product.identity.toString().toLowerCase().includes(serviceCode.toLowerCase()) ||
            item.product.title.toLowerCase().includes(serviceCode.toLowerCase()) ||
            item.category.name.toLowerCase().includes(serviceCode.toLowerCase())
    );

    return (
        <div className={styles.overlay} onClick={toggleModal}>
            <div className={styles.container} onClick={event => event.stopPropagation()}>
                <input
                    className={styles.search}
                    type={"text"}
                    ref={inputRef}
                    value={serviceCode}
                    placeholder="Search by service code #"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setServiceCode(event.target.value)}}
                />
                <ul className={styles.modalSearchUl}>
                    {isCategoriesLoading || isInvoicesLoading ?
                        <>
                            <li className={styles.modalSearchLi}>
                                <img className={styles.loading} src={loading.src} alt={""} height={40}/>
                            </li>
                        </>
                        :
                        <>
                        {filteredItems.map(item => (
                            <li
                                key={item.product.identity}
                                className={styles.modalSearchLi}
                                onClick={() => searchNavigation(item)}
                            >
                                <img
                                    src={item.product.imageUrl === "" ? listIcon.src : item.product.imageUrl}
                                    alt={""}
                                    width={26}
                                    height={26}

                                />
                                <span>{item.product.title}</span>
                                <span>{item.category.name}</span>
                                <span>#{item.product.identity}</span>
                            </li>
                        ))}
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default SearchModal;