import {FunctionComponent, useState} from "react";
import {Typography} from "@mui/material";
import {useKeplerContext, useUserInfoContext} from "../../../contexts";
import {LoginModal} from "../../modals";
import {CommonButton} from "../common-button";

export const LoginButton: FunctionComponent = () => {
    const {walletConnected} = useKeplerContext();
    const {emailVerified} = useUserInfoContext();

    const [open, setOpen] = useState(false);

    return (
        <>
            <CommonButton onClick={()=>setOpen(true)} disabled={walletConnected && emailVerified}>
                {!walletConnected && !emailVerified &&
                    <Typography className='bold16'>
                        Log In
                    </Typography>
                }
                {!walletConnected && emailVerified &&
                    <Typography className='bold16'>
                        Connect Wallet
                    </Typography>
                }
                {walletConnected && !emailVerified &&
                    <Typography className='bold16'>
                        Connect Email
                    </Typography>
                }
                {walletConnected && emailVerified &&
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