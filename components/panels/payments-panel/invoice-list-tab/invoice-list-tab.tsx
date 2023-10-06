import React, {FunctionComponent, useState} from "react";
import {
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
    const [invoices, setInvoices] = useState<Invoice[]>();

    return (
        <TableContainer component={Paper}>
            <Table sx={{
                minWidth: 700,
                borderRadius: '6px',
                borderCollapse: 'unset',
                border: '3px solid',
                borderImage: 'linear-gradient(39deg, #343434 -7.27%, #FBFBFB 45.86%, #3F3F3F 118.09%) 1',
            }}>
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
                        <StyledTableCell colSpan={2} style={{width: '25%', borderBottom: 0}} className={styles.borderLeftCell}>
                            <Typography className='bold12'>Amount</Typography>
                        </StyledTableCell>
                        <StyledTableCell rowSpan={2} style={{width: '5%'}} className={styles.borderLeftCell}>
                            <Typography className='bold12'>Status</Typography>
                        </StyledTableCell>
                        <StyledTableCell colSpan={2} style={{width: '25%', borderBottom: 0}} className={styles.borderLeftCell}>
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
                                    <Typography className='bold12' textTransform='capitalize'>{invoiceItem.identity}</Typography>
                                </StyledTableCell>
                                <StyledTableCell className={styles.borderLeftCell}>
                                    <Typography className='bold12' textTransform='capitalize'>{invoiceItem.type}</Typography>
                                </StyledTableCell>
                                <StyledTableCell className={styles.borderLeftCell}>
                                    <Typography className='bold12'>{invoiceItem.title}</Typography>
                                </StyledTableCell>
                                <StyledTableCell className={styles.borderLeftCell}>
                                    <Typography sx={{textAlign: 'center', width: '100%'}} className='bold12'>
                                        {invoiceItem.direction}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell className={styles.borderLeftCell}>
                                    <Typography className='bold12'>{invoiceItem.requestedAmount}</Typography>
                                    <Typography className='bold12' textTransform='uppercase'>
                                        {invoiceItem.requestedAsset}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    {invoiceItem.payedAmount &&
                                        <Typography className='bold12'>{invoiceItem.payedAmount}</Typography>
                                        ||
                                        <RemoveIcon/>
                                    }
                                </StyledTableCell>
                                <StyledTableCell className={styles.borderLeftCell}>
                                    <Typography className='bold12'>{invoiceItem.status}</Typography>
                                </StyledTableCell>
                                <StyledTableCell className={styles.borderLeftCell}>
                                    {invoiceItem.creationDate &&
                                        <>
                                            <Typography className='bold12'>{invoiceItem.creationDate.split("T")[1]}</Typography>
                                            <Typography className='bold12'>{invoiceItem.creationDate.split("T")[0]}</Typography>
                                        </>
                                    }
                                </StyledTableCell>
                                <StyledTableCell>
                                    {invoiceItem.dueDate &&
                                        <>
                                            <Typography className='bold12'>{invoiceItem.dueDate.split("T")[1]}</Typography>
                                            <Typography className='bold12'>{invoiceItem.dueDate.split("T")[0]}</Typography>
                                        </>
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}