import {createContext, useContext} from "react";
import {Keplr} from "@keplr-wallet/types";

export type KeplerContextSetting = {
    kepler?: Keplr;
    setKepler: (k: Keplr) => void;
    walletConnected: boolean;
    setWalletConnected: (b: boolean) => void;
}

export const KeplerContext = createContext<KeplerContextSetting>({
    kepler: undefined,
    setKepler: () => {},
    walletConnected: false,
    setWalletConnected: () => {}
});

export const useKeplerContext = () => useContext(KeplerContext);