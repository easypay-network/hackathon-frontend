import {NextPage} from "next";
import * as React from "react";
import styles from "./main-page-panel.module.css";
import Link from "next/link"

const MainPagePanel: NextPage = () => {
    return (
        <div>
            <div className={styles.frameContainer}>
                <h1>Catalog</h1>
                <p>
                    Discover our catalog of diverse asset categories tailored for Web 3 payments. Our collection offers
                    a wide array of assets designed to facilitate secure and efficient transactions within the Web 3
                    ecosystem. Explore the future of digital commerce with our curated selection, where innovation meets
                    seamless payment solutions. Whether you're a developer, investor, or enthusiast, our catalog has the
                    resources you need to thrive in the decentralized web space.
                </p>
                <Link href='/catalog'>
                    <button>Check the Catalog</button>
                </Link>
            </div>
            <div className={styles.frameContainer}>
                <h1>Payments</h1>
                <p>
                    Our Payments service offers a versatile platform that empowers users to effortlessly manage their
                    financial transactions. Whether it's paying invoices, generating invoices, or compiling
                    comprehensive reports, our service provides a seamless and user-friendly experience. With our
                    intuitive tools and robust features, you can streamline your financial processes, ensuring
                    efficiency and accuracy every step of the way.
                </p>
                <Link href='/payments'>
                    <button>Try Payments</button>
                </Link>
            </div>
            <div className={styles.frameContainer}>
                <h1>Swap</h1>
                <p>
                    Our token swap system offers a straightforward and intuitive solution for seamlessly exchanging
                    tokens across different blockchain networks. With a user-friendly interface and easy-to-follow
                    steps, users can effortlessly transition between blockchains, simplifying the process of managing
                    digital assets.
                </p>
                <Link href='/swap'>
                    <button>Let&#039;s Swap something</button>
                </Link>
            </div>
            <div className={styles.frameContainer}>
                <h1>Integrations</h1>
                <p>
                    Our platform offers seamless integration with blockchain marketplaces, providing users with enhanced
                    access to a world of decentralized applications and services. With our versatile integration
                    features, you can easily connect to a variety of blockchain ecosystems, enabling secure and
                    efficient interactions within the decentralized marketplace.
                </p>
                <Link href='/integrations'>
                    <button>Integrations</button>
                </Link>
            </div>
            <div className={styles.frameContainer}>
                <h1>About</h1>
                <p>
                    Our team consists of developers working in the Web3 space. We have experience working with various
                    blockchains and have won several hackathons with our projects.
                </p>
                <Link href='/about'>
                    <button>Find out more about us</button>
                </Link>
            </div>
        </div>
    );
};

export default MainPagePanel;