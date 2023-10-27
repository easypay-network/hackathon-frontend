import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import styles from "./login-modal.module.css";
import {useKeplrContext, usePhantomContext, useUserInfoContext} from "../../../contexts";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import classNames from "classnames";
import {getKeplrFromWindow} from "./getKeplrFromWindow";
import {CommonModal} from "../common-modal";
import {CustomDivider} from "../../items";
import getPhantomFromWindow from "./getPhantomFromWindow";
import {ConnectButton} from "../../buttons/connect-button";
import phantomIcon from "../../../public/phantomIcon.svg"
import keplrIcon from "../../../public/keplrIcon.svg"
import googleIcon from "../../../public/googleIcon.svg"
import {ChainInfoWithoutEndpoints} from "@keplr-wallet/types/src/chain-info";
import {supportedNetworks} from "../../constants";
import {AccountData, Keplr} from "@keplr-wallet/types";

interface Props {
    open: boolean;
    setOpen: Function;
}

export const LoginModal: FunctionComponent<Props> = ({open, setOpen}) => {
    const {setKeplr, keplrWalletConnected, setKeplrWalletConnected, setUserAddresses} = useKeplrContext();
    const {setPhantomProvider, phantomWalletConnected, setPhantomWalletConnected} = usePhantomContext();
    const {setEmail, emailVerified, setEmailVerified} = useUserInfoContext();

    const getAddressFromWallet = async (keplr: Keplr, chainId : string) => {
        const offlineSigner = keplr.getOfflineSigner(chainId);
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        return account.address;
    }

    const onKeplrConnect = () => {
        getKeplrFromWindow().then((keplr) => {
            if (!keplr || !keplr.getOfflineSigner) {
                alert("Please install keplr extension");
            } else {
                keplr.getChainInfosWithoutEndpoints()
                    .then((keplrChains: ChainInfoWithoutEndpoints[]) => {
                        const installedChains = new Set(keplrChains.map(keplrChain => keplrChain.chainId));
                        const supportedChains = new Set(supportedNetworks.keys());

                        const chainsToEnable = new Set([...installedChains].filter(chainId => supportedChains.has(chainId)));

                        keplr.enable([...chainsToEnable])
                            .then(() => {
                                return Promise
                                    .all([...chainsToEnable].map(chainId => getAddressFromWallet(keplr, chainId)))
                                    .then((userAddresses: string[]) => {
                                        setUserAddresses(userAddresses);
                                    });
                            })
                            .then(() => {
                                setKeplr(keplr);
                                setKeplrWalletConnected(true);
                            })
                            .catch((error) => console.error(error));
                    })
                    .catch((error) => console.error(error));
            }
        });
    }

    const onPhantomConnect = () => {
        const phantom = getPhantomFromWindow();

        if (!phantom) {
            alert("Please install phantom extension");
        } else {
            phantom.connect()
                .then(() => {
                    setPhantomProvider(phantom);
                    setPhantomWalletConnected(true);
                })
                .catch((error) => console.error(error));
        }
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
                    <Typography className={classNames('bold16', phantomWalletConnected && keplrWalletConnected && styles.connectedLabel)}
                                paddingBottom='16px'
                    >
                        Connect Wallet
                    </Typography>
                    <ConnectButton connected={phantomWalletConnected} logoUrl={phantomIcon.src} onClick={onPhantomConnect} buttonName={'Phantom'} />
                </Box>
                <Box textAlign="center">
                    <Typography className={classNames('bold16', keplrWalletConnected && styles.connectedLabel)}
                                paddingBottom='16px'
                    >
                    </Typography>
                    <ConnectButton connected={keplrWalletConnected} logoUrl={keplrIcon.src} onClick={onKeplrConnect} buttonName={'Keplr'} />
                </Box>
                <CustomDivider/>
                <Box textAlign="center">
                    <Typography className={classNames('bold16', emailVerified && styles.connectedLabel)}
                                paddingBottom='16px'
                    >
                        Connect Email
                    </Typography>
                    <ConnectButton connected={emailVerified} logoUrl={googleIcon.src} onClick={googleLogin} buttonName={'Gmail'} />
                </Box>
            </Box>
        </CommonModal>
    );
}