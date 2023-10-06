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

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <title>EasyPay Network</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}
