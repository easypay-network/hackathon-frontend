import {PhantomProvider} from "../../types";

const getPhantomFromWindow = (): PhantomProvider | undefined => {
    if ('phantom' in window) {
        const anyWindow: any = window;
        const provider = anyWindow.phantom?.solana;

        if (provider?.isPhantom) {
            return provider;
        }
    }

    window.open('https://phantom.app/', '_blank');
};

export default getPhantomFromWindow;