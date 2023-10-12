import * as React from 'react';
import {useEffect, useState} from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import '../styles/global.css';
import '../styles/fonts.css';
import theme from '../components/material-ui-lib/theme';
import createEmotionCache from '../components/material-ui-lib/createEmotionCache';
import {Keplr} from "@keplr-wallet/types";
import {GoogleOAuthProvider} from '@react-oauth/google';
import {KeplrContext, PhantomContext, UserInfoContext} from '../contexts';
import {PublicKey} from "@solana/web3.js";
import {PhantomProvider} from "../components/types";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    const [keplr, setKeplr] = useState<Keplr>();
    const [keplrWalletConnected, setKeplrWalletConnected] = useState(false);
    const [phantomProvider, setPhantomProvider] = useState<PhantomProvider>();
    const [phantomWalletConnected, setPhantomWalletConnected] = useState(false);
    const [email, setEmail] = useState<string>();
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect( () => {
        if (!phantomProvider) return;

        // attempt to eagerly connect
        phantomProvider.connect({ onlyIfTrusted: true }).catch(() => {
            // fail silently
        });

        phantomProvider?.on("connect", (publicKey: PublicKey) => {
            console.log(`connect event: ${publicKey}`);
            setPhantomWalletConnected(true);
        });
        phantomProvider?.on("disconnect", () => {
            console.log("disconnect event");
            setPhantomWalletConnected(false);
        });

        return () => {
            phantomProvider.disconnect();
        };
    }, [phantomProvider]);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <title>EasyPay Network</title>
            </Head>
            <ThemeProvider theme={theme}>
                <GoogleOAuthProvider clientId="1094710821469-7lg6ktj0bcg2u1m76jg4g5h2ogi3mv2d.apps.googleusercontent.com">
                    <KeplrContext.Provider value={{keplr, setKeplr, keplrWalletConnected, setKeplrWalletConnected}}>
                        <PhantomContext.Provider value={{phantomProvider, setPhantomProvider, phantomWalletConnected, setPhantomWalletConnected}}>
                            <UserInfoContext.Provider value={{email, setEmail, emailVerified, setEmailVerified}}>
                                <CssBaseline/>
                                <Component {...pageProps} />
                            </UserInfoContext.Provider>
                        </PhantomContext.Provider>
                    </KeplrContext.Provider>
                </GoogleOAuthProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
