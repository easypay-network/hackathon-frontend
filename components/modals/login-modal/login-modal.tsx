import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./login-modal.module.css";
import {useKeplerContext, useUserInfoContext} from "../../../contexts";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import classNames from "classnames";
import {getKeplrFromWindow} from "./getKeplrFromWindow";
import {rpcAddresses} from "../../constants";
import {CommonButton} from "../../buttons";
import {CommonModal} from "../common-modal";
import {CustomDivider} from "../../items";

interface Props {
    open: boolean;
    setOpen: Function;
}

export const LoginModal: FunctionComponent<Props> = ({open, setOpen}) => {
    const {setKepler, walletConnected, setWalletConnected} = useKeplerContext();
    const {setEmail, emailVerified, setEmailVerified} = useUserInfoContext();

    const onKeplerConnect = () => {
        getKeplrFromWindow().then((keplr) => {
            if (!keplr || !keplr.getOfflineSigner) {
                alert("Please install kepler extension");
            } else {
                keplr.enable([...rpcAddresses.keys()])
                    .then(() => {
                        setKepler(keplr);
                        setWalletConnected(true);
                    })
                    .catch((error) => console.error(error));
            }
        });
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {headers: {Authorization: `Bearer ${tokenResponse.access_token}`}},
            );

            setEmail(userInfo.data.email);
            setEmailVerified(true);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <CommonModal
            modalContainerStyle={styles.loginModalContainer}
            open={open}
            setOpen={setOpen}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box>
                    <Typography className={classNames('bold16', walletConnected && styles.connectedLabel)}
                                paddingBottom='16px'
                    >
                        Connect your Wallet
                    </Typography>
                    <CommonButton onClick={onKeplerConnect} disabled={walletConnected}>
                        <Typography className="medium14">
                            Keplr
                        </Typography>
                    </CommonButton>
                </Box>
                <CustomDivider/>
                <Box>
                    <Typography className={classNames('bold16', emailVerified && styles.connectedLabel)}
                                paddingBottom='16px'
                    >
                        Connect your Email
                    </Typography>
                    <CommonButton onClick={googleLogin} disabled={emailVerified}>
                        <Typography className="medium14">
                            Gmail
                        </Typography>
                    </CommonButton>
                </Box>
            </Box>
        </CommonModal>
    );
}