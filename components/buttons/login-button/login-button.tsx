import {FunctionComponent, useState} from "react";
import styles from "./login-button.module.css"
import {Typography} from "@mui/material";
import {useKeplrContext, usePhantomContext, useUserInfoContext} from "../../../contexts";
import {LoginModal} from "../../modals";
import {CommonButton} from "../common-button";
import {CommonButtonCustom} from "../common-button-custom";

export const LoginButton: FunctionComponent = () => {
    const {keplrWalletConnected} = useKeplrContext();
    const {phantomWalletConnected} = usePhantomContext();
    const {emailVerified} = useUserInfoContext();

    const [open, setOpen] = useState(false);

    return (
        <>
            <CommonButtonCustom className={`${keplrWalletConnected || phantomWalletConnected || emailVerified ? styles.loginButtonConnected : styles.loginButton}`}
                          onClick={()=>setOpen(true)}
                          disabled={keplrWalletConnected && phantomWalletConnected && emailVerified}>
                {!keplrWalletConnected && !phantomWalletConnected && !emailVerified &&
                    <Typography className='bold16'>
                        Log In
                    </Typography>
                }
                {(!keplrWalletConnected || !phantomWalletConnected) && emailVerified &&
                    <Typography className='bold16'>
                        Connect Wallet
                    </Typography>
                }
                {(keplrWalletConnected || phantomWalletConnected) && !emailVerified &&
                    <Typography className='bold16'>
                        Connect Email
                    </Typography>
                }
                {keplrWalletConnected && phantomWalletConnected && emailVerified &&
                    <Typography className='bold16'>
                        Connected
                    </Typography>
                }
            </CommonButtonCustom>

            <LoginModal
                open={open}
                setOpen={setOpen}
            />
        </>
    );
}