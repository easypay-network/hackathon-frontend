import {createContext, useContext} from "react";
import {Keplr} from "@keplr-wallet/types";

export type KeplrContextSetting = {
    keplr?: Keplr;
    setKeplr: (k: Keplr) => void;
    keplrWalletConnected: boolean;
    setKeplrWalletConnected: (b: boolean) => void;
    userAddresses: string[];
    setUserAddresses: (s: string[]) => void;
}

export const KeplrContext = createContext<KeplrContextSetting>({
    keplr: undefined,
    setKeplr: () => {},
    keplrWalletConnected: false,
    setKeplrWalletConnected: () => {},
    userAddresses: [],
    setUserAddresses: () => {}
});

export const useKeplrContext = () => useContext(KeplrContext);