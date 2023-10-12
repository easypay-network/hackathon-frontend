import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./login-modal.module.css";
import {useKeplrContext, usePhantomContext, useUserInfoContext} from "../../../contexts";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import classNames from "classnames";
import {getKeplrFromWindow} from "./getKeplrFromWindow";
import {keplrNetworks, rpcAddresses} from "../../constants";
import {CommonButton} from "../../buttons";
import {CommonModal} from "../common-modal";
import {CustomDivider} from "../../items";
import getPhantomFromWindow from "./getPhantomFromWindow";

interface Props {
    open: boolean;
    setOpen: Function;
}

export const LoginModal: FunctionComponent<Props> = ({open, setOpen}) => {
    const {setKeplr, keplrWalletConnected, setKeplrWalletConnected} = useKeplrContext();
    const {setPhantomProvider, phantomWalletConnected} = usePhantomContext();
    const {setEmail, emailVerified, setEmailVerified} = useUserInfoContext();

    const onKeplrConnect = () => {
        getKeplrFromWindow().then((keplr) => {
            if (!keplr || !keplr.getOfflineSigner) {
                alert("Please install keplr extension");
            } else {
                keplr.enable([...rpcAddresses.keys()].filter(network => keplrNetworks.includes(network)))
                    .then(() => {
                        setKeplr(keplr);
                        setKeplrWalletConnected(true);
                    })
                    .catch((error) => console.error(error));
            }
        });
    }

    const onPhantomConnect = () => {
        const phantom = getPhantomFromWindow();
        if (phantom) setPhantomProvider(phantom);
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
                <Box textAlign="center">
                    <Typography className={classNames('bold16', phantomWalletConnected && styles.connectedLabel)}
                                paddingBottom='16px'
                    >
                        Connect your Phantom Wallet
                    </Typography>
                    <CommonButton width="200px" onClick={onPhantomConnect} disabled={phantomWalletConnected}>
                        <Typography className="medium14">
                            Phantom
                        </Typography>
                    </CommonButton>
                </Box>
                <CustomDivider/>
                <Box textAlign="center">
                    <Typography className={classNames('bold16', keplrWalletConnected && styles.connectedLabel)}
                                paddingBottom='16px'
                    >
                        Connect your Keplr Wallet
                    </Typography>
                    <CommonButton width="200px" onClick={onKeplrConnect} disabled={keplrWalletConnected}>
                        <Typography className="medium14">
                            Keplr
                        </Typography>
                    </CommonButton>
                </Box>
                <CustomDivider/>
                <Box textAlign="center">
                    <Typography className={classNames('bold16', emailVerified && styles.connectedLabel)}
                                paddingBottom='16px'
                    >
                        Connect your Email
                    </Typography>
                    <CommonButton width="200px"  onClick={googleLogin} disabled={emailVerified}>
                        <Typography className="medium14">
                            Gmail
                        </Typography>
                    </CommonButton>
                </Box>
            </Box>
        </CommonModal>
    );
}