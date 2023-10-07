import {NextPage} from "next";
import Image from 'next/image'
import styles from "./about-panel.module.css"
import doni from "../../../public/about-team-images/doni.png"
import sa from "../../../public/about-team-images/sa.png"
import ih from "../../../public/about-team-images/ihar.png"
import alex from "../../../public/about-team-images/alex.png"
import linkedIn from "../../../public/lnkdinLogo.svg"
import twitter from "../../../public/twitterLogo.svg"

const AboutPanel: NextPage = () => {
    return (
        <div className={styles.aboutContent}>
            <div className={styles.aboutContainer}>
                <div>
                    <h1 className={styles.title}>About</h1>
                    <p className={styles.text}>Our team consists of developers working in the Web3 space. We have experience working with various blockchains and have won several hackathons with our projects.</p>
                </div>
            </div>
            <h1 className={styles.teamTitle}>Team</h1>
            <div className={styles.teamContainer}>
                <div className={styles.memberCard}>
                    <Image width={'218px'} height={'389px'} src={doni.src} alt="" priority={true}/>
                    <div className={styles.socialContainer}>
                        <a href={'https://www.linkedin.com/in/dharapko'} target={'_blank'}  rel="noreferrer"><Image width={'25px'} height={'25px'}  src={linkedIn.src} alt="" className={styles.socialLinks}/></a>
                        <a href={'https://x.com/raumo0'} target={'_blank'}  rel="noreferrer"><Image width={'25px'} height={'25px'} src={twitter.src} alt="" className={styles.socialLinks}/></a>
                    </div>
                    <div className={styles.cardText}>
                        <h3>Daniel<br/>Harapko</h3>
                        <p>Tech & Product Lead</p>
                    </div>
                </div>
                <div className={styles.memberCard}>
                    <Image width={'218px'} height={'389px'} src={alex.src} alt="" priority={true}/>
                    <div className={styles.socialContainer}>
                        <a href={'https://www.linkedin.com/in/aldziki'} target={'_blank'} rel="noreferrer"><Image width={'25px'} height={'25px'} src={linkedIn.src} alt="" className={styles.socialLinks}/></a>
                        <a href={'https://twitter.com/Aleks_Dziki'} target={'_blank'} rel="noreferrer"><Image width={'25px'} height={'25px'} src={twitter.src} alt="" className={styles.socialLinks}/></a>
                    </div>
                    <div className={styles.cardText}>
                        <h3>Alexander<br/>Dziki</h3>
                        <p>Fullstack Engineer</p>
                    </div>
                </div>
                <div className={styles.memberCard}>
                    <Image width={'218px'} height={'389px'} src={sa.src} alt="" priority={true}/>
                    <div className={styles.socialContainer}>
                        <a href={'https://www.linkedin.com/in/aharapko' } target={'_blank'} rel="noreferrer"><Image width={'25px'} height={'25px'} src={linkedIn.src} alt="" className={styles.socialLinks}/></a>
                        <a href={'https://twitter.com/Sanikatusa'} target={'_blank'} rel="noreferrer"><Image width={'25px'} height={'25px'} src={twitter.src} alt="" className={styles.socialLinks}/></a>
                    </div>
                    <div className={styles.cardText}>
                        <h3>Alexandra<br/>Harapko</h3>
                        <p>Product Designer</p>
                    </div>
                </div>
                <div className={styles.memberCard}>
                    <Image width={'218px'} height={'389px'} src={ih.src} alt="" priority={true}/>
                    <div className={styles.socialContainer}>
                        <a href={'https://www.linkedin.com/in/iharpetlicki'} target={'_blank'} rel="noreferrer"><Image width={'25px'} height={'25px'} src={linkedIn.src} alt="" className={styles.socialLinks}/></a>
                    </div>
                    <div className={styles.cardText}>
                        <h3>Ihar<br/>Petlicki</h3>
                        <p>Frontend Engineer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPanel;