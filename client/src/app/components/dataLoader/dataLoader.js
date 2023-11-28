'use client'

import styles from './dataLoader.module.css';

export default function dataLoader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}><div></div><div></div><div></div></div>
        </div>
    );
};
