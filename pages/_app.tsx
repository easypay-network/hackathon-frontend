import * as React from 'react';
import {useState} from 'react';
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
import {PhantomProvider} from "../components/types";
import {googleOAuthClientId} from '../components/constants';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    const [keplr, setKeplr] = useState<Keplr>();
    const [keplrWalletConnected, setKeplrWalletConnected] = useState(false);
    const [userAddresses, setUserAddresses] = useState<string[]>([]);
    const [phantomProvider, setPhantomProvider] = useState<PhantomProvider>();
    const [phantomWalletConnected, setPhantomWalletConnected] = useState(false);
    const [email, setEmail] = useState<string>();
    const [emailVerified, setEmailVerified] = useState(false);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <title>EasyPay Network</title>
            </Head>
            <ThemeProvider theme={theme}>
                <GoogleOAuthProvider clientId={googleOAuthClientId}>
                    <KeplrContext.Provider value={{keplr, setKeplr, keplrWalletConnected, setKeplrWalletConnected, userAddresses, setUserAddresses}}>
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
