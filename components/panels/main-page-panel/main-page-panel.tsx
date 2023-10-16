import {NextPage} from "next";
import * as React from "react";
import styles from "./main-page-panel.module.css";
import {useRouter} from "next/router";
import logo from "../../../public/main-page/main-page-logo.png";
import underlining from "../../../public/main-page/main-page-underlining.svg";
import textLogo from "../../../public/main-page/main-page-text-logo.svg";
import arrow from "../../../public/main-page/main-page-arrow.svg";
import catalog from "../../../public/main-page/catalog.png";
import giftCards from "../../../public/main-page/gift-cards.png";
import donation from "../../../public/main-page/donation.png";
import payments from "../../../public/main-page/payments.png";
import swap from "../../../public/main-page/swap.png";
import about from "../../../public/main-page/about.png";
import integration1 from "../../../public/main-page/integration1.svg"
import integration2 from "../../../public/main-page/integration2.svg"
import integration3 from "../../../public/main-page/integration3.svg"
import integration4 from "../../../public/main-page/integration4.svg"
import {CommonButtonCustom} from "../../buttons";
import {useState} from "react";
import {LoginModal} from "../../modals";

const MainPagePanel: NextPage = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const handleClick = (page: string) => {
        router.push(
            {
                pathname: `/${page}`,
            },
            `/${page}`,
            {shallow: true}
        );
    }

    return (
        <>
            <div className={styles.logosGrid}>
                <img alt='logo' src={logo.src}/>
                <div>
                    <div className={styles.title}>
                        <span>Unified Payment System
                            for</span>
                        &nbsp;
                        <span>Seamless Web3</span>
                        <img className={styles.underlining} alt="" src={underlining.src}/>
                    </div>
                </div>
                <img alt="textLogo" src={textLogo.src}/>
                <CommonButtonCustom className={styles.btn} onClick={() => setOpen(true)}>Log in</CommonButtonCustom>
            </div>
            <div className={styles.nav}>
                <a className={styles.navItem} href="#problems">Problems</a>
                <a href="#solutions">Existing solutions</a>
                <a href="#idea">Our idea</a>
            </div>

            <p id='problems' className={styles.thesis}>Problems</p>
            <div className={styles.problemsContainer}>
                <div className={styles.problem}>
                    <span className={styles.whiteDescription}>User<br/>fragmentation</span>
                </div>
                <div className={styles.problem}>
                    <span className={styles.whiteDescription}>Liquidity<br/>fragmentation</span>
                </div>
                <div className={styles.problem}>
                    <span className={styles.whiteDescription}>Complex Web3<br/>UX</span>
                </div>
                <div className={styles.problem}>
                    <span className={styles.whiteDescription}>Blockchain’s real<br/>economy gap</span>
                </div>
                <div className={styles.problem}>
                    <span className={styles.whiteDescription}>Misinterpret the<br/>user goal</span>
                </div>
            </div>

            <p id='solutions' className={styles.thesis}>Existing solutions</p>
            <div className={styles.solutionsGrid}>
                <div className={styles.solution}>
                    <span className={styles.whiteDescription}>DEX aggregators & routers</span>
                    <span className={styles.grayDescription}>Address intermediate,&nbsp; not final, user goals</span>
                </div>
                <div className={styles.solution}>
                    <span className={styles.whiteDescription}>Payment system as an AppChain</span>
                    <span className={styles.grayDescription}>AppChain as a wallet limits token storage choice and degrades UX</span>
                </div>
                <div className={styles.solution}>
                    <span className={styles.whiteDescription}>Trustful payment system</span>
                    <span className={styles.grayDescription}>They are trustful! Otherwise, they’re excellent</span>
                </div>
                <div className={styles.solution}>
                    <img alt='' src={arrow.src}/>
                </div>
                <div className={styles.solution}/>
                <div className={styles.solution}/>
                <div className={styles.solution}>
                    <span className={styles.whiteDescription}>Marketplace aggregators</span>
                    <span className={styles.grayDescription}>Poor UX with separate bridge and DEX usage</span>
                </div>
                <div className={styles.solution}>
                    <span className={styles.whiteDescription}>Custom infrastructure inc. bridges & protocols</span>
                    <span className={styles.grayDescription}>Their wrapped tokens fragment liquidity</span>
                </div>
            </div>

            <p className={styles.thesis} id='idea'>Our Idea</p>
            <div style={{height: "880px"}} className={styles.ideasContainer}>
                <div className={styles.ideaDescriptionContainer}>
                    <span className={styles.ideaName}>Catalog</span>
                    <span className={styles.ideaDescription}>
                        Discover our catalog of diverse asset categories tailored for
                        Web 3 payments. Our collection offers a wide array of assets designed to facilitate secure and
                        efficient transactions within the Web 3 ecosystem. Explore the future of digital commerce with
                        our curated selection, where innovation meets seamless payment solutions. Whether you&#39;re a
                        developer, investor, or enthusiast, our catalog has the resources you need to thrive in the
                        decentralized web space.
                    </span>
                    <CommonButtonCustom className={styles.btn} onClick={() => handleClick('catalog')}>Check the
                        Catalog</CommonButtonCustom>
                </div>
                <img style={{position: "absolute", right: "90px", top: "-20px"}} alt='' src={donation.src}/>
                <img style={{position: "absolute", left: "80px", bottom: "0px"}} alt='' src={giftCards.src}/>
                <img style={{position: "absolute", right: "20px", bottom: "190px"}} alt='' src={catalog.src}/>
            </div>

            <div style={{justifyContent: "flex-end", height: "720px"}} className={styles.ideasContainer}>
                <div className={styles.ideaDescriptionContainer}>
                    <span className={styles.ideaName}>Payments</span>
                    <span className={styles.ideaDescription}>
                        Our Payments service offers a versatile platform that empowers users to effortlessly manage
                        their financial transactions. Whether it&#39;s paying invoices, generating invoices, or compiling
                        comprehensive reports, our service provides a seamless and user-friendly experience. With our
                        intuitive tools and robust features, you can streamline your financial processes, ensuring
                        efficiency and accuracy every step of the way.
                    </span>
                    <CommonButtonCustom className={styles.btn} onClick={() => handleClick('payments/invoices')}>Try Payments</CommonButtonCustom>
                </div>
                <img style={{position: "absolute", left: "104px", top: "80px"}} alt='' src={payments.src}/>
            </div>

            <div style={{height: "650px"}} className={styles.ideasContainer}>
                <div className={styles.ideaDescriptionContainer}>
                    <span className={styles.ideaName}>Swap</span>
                    <span className={styles.ideaDescription}>
                        Our token swap system offers a straightforward and intuitive solution for seamlessly exchanging
                        tokens across different blockchain networks. With a user-friendly interface and easy-to-follow
                        steps, users can effortlessly transition between blockchains, simplifying the process of
                        managing digital assets.
                    </span>
                    <CommonButtonCustom className={styles.btn} onClick={() => handleClick('swap')}>Let&#39;s Swap
                        something</CommonButtonCustom>
                </div>
                <img style={{position: "absolute", right: "60px", top: "0"}} alt='' src={swap.src}/>
            </div>

            <div style={{justifyContent: "space-between", height: "600px"}} className={styles.ideasContainer}>
                <div className={styles.integrations}>
                    <div>
                        <img src={integration1.src} alt='' />
                        <span>With marketplaces</span>
                    </div>
                    <div>
                        <img src={integration2.src} alt='' />
                        <span>For dApps</span>
                    </div>
                    <div>
                        <img src={integration3.src} alt='' />
                        <span>Into payment interfaces</span>
                    </div>
                    <div>
                        <img src={integration4.src} alt='' />
                        <span>Invoices through API</span>
                    </div>
                </div>
                <div className={styles.ideaDescriptionContainer}>
                    <span className={styles.ideaName}>Integrations</span>
                    <span className={styles.ideaDescription}>
                        Our platform offers seamless integration with blockchain marketplaces, providing users with
                        enhanced access to a world of decentralized applications and services. With our versatile
                        integration features, you can easily connect to a variety of blockchain ecosystems, enabling
                        secure and efficient interactions within the decentralized marketplace.
                    </span>
                    <CommonButtonCustom className={styles.btn} onClick={() => handleClick('integrations')}>Integrations</CommonButtonCustom>
                </div>
            </div>

            <div style={{height: "450px"}} className={styles.ideasContainer}>
                <div className={styles.ideaDescriptionContainer}>
                    <span className={styles.ideaName}>About</span>
                    <span className={styles.ideaDescription}>
                        Our team consists of developers working in the Web3 domain. With experience across various
                        blockchains, we have successfully delivered Web3 solutions, seamlessly integrating Web2 UX into
                        the Web3 world.
                    </span>
                    <CommonButtonCustom className={styles.btn} onClick={() => handleClick('about')}>About Us</CommonButtonCustom>
                </div>
                <img style={{position: "absolute", right: "0", top: "0"}} alt='' src={about.src}/>
            </div>

            <LoginModal open={open} setOpen={setOpen}/>
        </>
    );
};

export default MainPagePanel;