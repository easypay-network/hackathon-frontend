import React, {FunctionComponent, useEffect, useState} from "react";
import {
    Box,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import styles from "./invoice-list-tab.module.css";
import RemoveIcon from '@mui/icons-material/Remove';
import {Invoice} from "../../../types";
import {CommonButton} from "../../../buttons";
import AddIcon from '@mui/icons-material/Add';
import {useUserInfoContext} from "../../../../contexts";
import {useRouter} from "next/router";
import Link from "next/link";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {InvoiceDirectionItem} from "./invoice-direction-item";
import {InvoiceStatusItem} from "./invoice-status-item";
import axios from "axios";
import {apiUrl} from "../../../constants";
import {LoadingItem} from "../../../items";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#222222',
        color: 'white',
        textTransform: 'uppercase',
        padding: '5px 0',
        textAlign: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
        borderBottom: 0,
        color: 'white',
        textAlign: 'center',
        padding: '15px 10px',
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(88, 88, 88, 1)',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'rgba(50, 50, 50, 1)',
    }
}));

export const InvoiceListTab: FunctionComponent = () => {
    const router = useRouter();

    const {email, emailVerified} = useUserInfoContext();

    const [invoices, setInvoices] = useState<Invoice[]>();

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${apiUrl}/invoices`, {
            params: {
                requesterEmail: emailVerified && email || ''
            }
        })
            .then((response) => {
                setInvoices(response.data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false)
            });
    }, []);

    return (
        <>
            <Box sx={{
                display: 'flex',
                marginBottom: '30px',
                justifyContent: 'flex-end'
            }}>
                <CommonButton onClick={() => router.push('/payments/constructor')}>
                    <>
                        <Typography className='bold16' textTransform='none'>
                            Create new
                        </Typography>
                        <AddIcon/>
                    </>
                </CommonButton>
            </Box>
                <TableContainer component={Paper}>
                    {isLoading ? <LoadingItem /> :
                    <Table className={styles.invoiceTable}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell rowSpan={2} style={{width: '10%'}}>
                                    <Typography className='bold12'>Id</Typography>
                                </StyledTableCell>
                                <StyledTableCell rowSpan={2} style={{width: '5%'}} className={styles.borderLeftCell}>
                                    <Typography className='bold12'>Type</Typography>
                                </StyledTableCell>
                                <StyledTableCell rowSpan={2} style={{width: '25%'}} className={styles.borderLeftCell}>
                                    <Typography className='bold12'>Title</Typography>
                                </StyledTableCell>
                                <StyledTableCell rowSpan={2} style={{width: '5%'}} className={styles.borderLeftCell}>
                                    <Typography className='bold12'>Direction</Typography>
                                </StyledTableCell>
                                <StyledTableCell colSpan={2} style={{width: '25%', borderBottom: 0}}
                                                 className={styles.borderLeftCell}>
                                    <Typography className='bold12'>Amount</Typography>
                                </StyledTableCell>
                                <StyledTableCell rowSpan={2} style={{width: '5%'}} className={styles.borderLeftCell}>
                                    <Typography className='bold12'>Status</Typography>
                                </StyledTableCell>
                                <StyledTableCell colSpan={2} style={{width: '25%', borderBottom: 0}}
                                                 className={styles.borderLeftCell}>
                                    <Typography className='bold12'>Date</Typography>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell className={styles.borderLeftCell}>
                                    <Typography className='bold12'>Requested</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography className='bold12'>Payed</Typography>
                                </StyledTableCell>
                                <StyledTableCell className={styles.borderLeftCell}>
                                    <Typography className='bold12'>Creation</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography className='bold12'>Due</Typography>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices && invoices.map((invoiceItem: Invoice) => {
                                return (
                                    <StyledTableRow key={invoiceItem.identity}>
                                        <StyledTableCell>
                                            <Link href={{
                                                pathname: '/payments/invoices/[invoice]',
                                                query: {invoice: invoiceItem.identity}
                                            }}>
                                                <Box className={styles.identityLink}>
                                                    <Typography className='bold12'>#{invoiceItem.identity}</Typography>
                                                    <OpenInNewIcon sx={{width: 20, height: 20}}/>
                                                </Box>
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell className={styles.borderLeftCell}>
                                            <Typography className='bold12'
                                                        textTransform='capitalize'>{invoiceItem.type}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell className={styles.borderLeftCell}>
                                            <Typography className='bold12'>{invoiceItem.title}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell className={styles.borderLeftCell}>
                                            <InvoiceDirectionItem direction={invoiceItem?.direction}/>
                                        </StyledTableCell>
                                        <StyledTableCell className={styles.borderLeftCell}>
                                            <Typography className='bold12'>{invoiceItem.requestedAmount}</Typography>
                                            <Typography className='bold12' textTransform='uppercase'>
                                                {invoiceItem.requestedAsset?.ticker || invoiceItem.requestedAsset?.originalTicker}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {invoiceItem.payedAmount &&
                                            <>
                                                <Typography className='bold12'>{invoiceItem.payedAmount}</Typography>
                                                <Typography className='bold12' textTransform='uppercase'>
                                                    {invoiceItem.payedAsset?.ticker || invoiceItem.payedAsset?.originalTicker}
                                                </Typography>
                                            </>
                                            ||
                                            <RemoveIcon/>
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell className={styles.borderLeftCell}>
                                            <InvoiceStatusItem status={invoiceItem?.status}/>
                                        </StyledTableCell>
                                        <StyledTableCell className={styles.borderLeftCell}>
                                            {invoiceItem.creationDate &&
                                            <>
                                                <Typography
                                                    className='bold12'>{invoiceItem.creationDate.split("T")[1]}</Typography>
                                                <Typography
                                                    className='bold12'>{invoiceItem.creationDate.split("T")[0]}</Typography>
                                            </>
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {invoiceItem.dueDate &&
                                            <>
                                                <Typography
                                                    className='bold12'>{invoiceItem.dueDate.split("T")[1]}</Typography>
                                                <Typography
                                                    className='bold12'>{invoiceItem.dueDate.split("T")[0]}</Typography>
                                            </>
                                            }
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    }
                </TableContainer>
        </>
    );
}