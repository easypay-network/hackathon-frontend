import React, {FunctionComponent} from "react";
import {Box, IconButton, Modal, Typography} from "@mui/material";
import styles from "./common-modal.module.css";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    children: React.ReactNode;
    modalContainerStyle: string;
    open: boolean;
    setOpen: Function;
}

export const CommonModal: FunctionComponent<Props> = ({children, modalContainerStyle, open, setOpen}) => {
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={modalContainerStyle}>
                <Box className={styles.modalBody}>
                    <IconButton className={styles.closeIcon} component="label" onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                    <Box>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}