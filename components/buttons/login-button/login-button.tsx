import {FunctionComponent, useState} from "react";
import {Typography} from "@mui/material";
import {useKeplrContext, usePhantomContext, useUserInfoContext} from "../../../contexts";
import {LoginModal} from "../../modals";
import {CommonButton} from "../common-button";

export const LoginButton: FunctionComponent = () => {
    const {keplrWalletConnected} = useKeplrContext();
    const {phantomWalletConnected} = usePhantomContext();
    const {emailVerified} = useUserInfoContext();

    const [open, setOpen] = useState(false);

    return (
        <>
            <CommonButton onClick={()=>setOpen(true)} disabled={keplrWalletConnected && phantomWalletConnected && emailVerified}>
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
            </CommonButton>

            <LoginModal
                open={open}
                setOpen={setOpen}
            />
        </>
    );
}