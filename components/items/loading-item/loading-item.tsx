import React, {FunctionComponent} from 'react';
import loading from "./loading.svg";
import styles from "./loading-item.module.css";

export const LoadingItem: FunctionComponent = () => {
    return (
        <>
            <img src={loading.src} alt='' className={styles.loading}/>
        </>
    );
};
