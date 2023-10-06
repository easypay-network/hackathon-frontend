import {NextPage} from "next";
import React, {useState} from "react";
import {useRouter} from "next/router";
import styles from "./report-item.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {CommonModal} from "../../../modals/common-modal";
import {CommonButton} from "../../../buttons";


const ReportItem: NextPage = () => {
    const router = useRouter()
    const {report} = router.query
    const reportBackClick = () => {
        router.push('/payments/reports',
            undefined,
            { shallow: true }
        )
    }
    function capitalizeString(inputString: string | string[] | undefined) {
        if (!inputString) {
            return inputString;
        }
        return typeof inputString === "string" ? inputString?.charAt(0).toUpperCase() + inputString.slice(1) : inputString
    }
    const [date1, setDate1] = useState<string>('');
    const [date2, setDate2] = useState<string>('');
    const [open, setOpen] = useState(false)
    const handleDate1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate1(event.target.value);
    }
    const handleDate2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate2(event.target.value);
    }
    const areBothDatesFilled = date1 !== '' && date2 !== '';
    const modalClick = () => {
        areBothDatesFilled ? setOpen(!open) : null
    }

    return (
        <>
            <div className={styles.reportMainContainer}>
                <h2>{capitalizeString(report)}</h2>
                <div className={styles.dateInputContainer}>
                    <div className={styles.dates}>
                        <p>From date</p>
                        <input type={'datetime-local'} className={styles.dateInput} min="2020-12-31T00:00" max="2030-12-31T00:00" required={true} onChange={handleDate1Change}/>
                    </div>
                    <div className={styles.dates}>
                        <p>To date</p>
                        <input type={'datetime-local'} className={styles.dateInput} min="2020-12-31T00:00" max="2030-12-31T00:00" required={true} onChange={handleDate2Change}/>
                    </div>
                </div>
                <button className={areBothDatesFilled ? styles.activeButton : styles.inactiveButton} onClick={() => modalClick()}>Create report</button>
                <ArrowBackIcon sx={{width:'40px', height:'40px'}} onClick={() => reportBackClick()} className={styles.backButton}/>
                <CommonModal modalContainerStyle={styles.modal} open={open} setOpen={modalClick}>
                    <h4>{capitalizeString(report)}</h4>
                    <div className={styles.text}>
                        <b>The report you requested has been generated, but please note that </b>
                        <b>this is just a prototype illustrating the application&apos;s logic and functionality</b>
                        <b>. Just imagine that you have received the report and saved it for your reference.</b>
                    </div>
                    <CommonButton onClick={modalClick} className={styles.btn}>OK</CommonButton>
                </CommonModal>
            </div>
            </>
    )
}

export default ReportItem;