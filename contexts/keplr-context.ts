import {createContext, useContext} from "react";
import {Keplr} from "@keplr-wallet/types";

export type KeplrContextSetting = {
    keplr?: Keplr;
    setKeplr: (k: Keplr) => void;
    keplrWalletConnected: boolean;
    setKeplrWalletConnected: (b: boolean) => void;
}

export const KeplrContext = createContext<KeplrContextSetting>({
    keplr: undefined,
    setKeplr: () => {},
    keplrWalletConnected: false,
    setKeplrWalletConnected: () => {}
});

export const useKeplrContext = () => useContext(KeplrContext);