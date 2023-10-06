import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import '../styles/global.css';
import '../styles/fonts.css';
import theme from '../components/material-ui-lib/theme';
import createEmotionCache from '../components/material-ui-lib/createEmotionCache';
import {useState} from "react";
import {Keplr} from "@keplr-wallet/types";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { KeplerContext, UserInfoContext } from '../contexts';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    const [kepler, setKepler] = useState<Keplr>();
    const [walletConnected, setWalletConnected] = useState(false);
    const [email, setEmail] = useState<string>();
    const [emailVerified, setEmailVerified] = useState(false);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <title>EasyPay Network</title>
            </Head>
            <ThemeProvider theme={theme}>
                <GoogleOAuthProvider clientId="1094710821469-7lg6ktj0bcg2u1m76jg4g5h2ogi3mv2d.apps.googleusercontent.com">
                    <KeplerContext.Provider value={{kepler, setKepler, walletConnected, setWalletConnected}}>
                        <UserInfoContext.Provider value={{email, setEmail, emailVerified, setEmailVerified}}>
                            <CssBaseline/>
                            <Component {...pageProps} />
                        </UserInfoContext.Provider>
                    </KeplerContext.Provider>
                </GoogleOAuthProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
