import {createContext, useContext} from "react";
import {PhantomProvider} from "../components/types";

export type PhantomContextSetting = {
    phantomProvider?: PhantomProvider;
    setPhantomProvider: (p: PhantomProvider) => void;
    phantomWalletConnected: boolean;
    setPhantomWalletConnected: (b: boolean) => void;
}

export const PhantomContext = createContext<PhantomContextSetting>({
    phantomProvider: undefined,
    setPhantomProvider: () => {},
    phantomWalletConnected: false,
    setPhantomWalletConnected: () => {}
});

export const usePhantomContext = () => useContext(PhantomContext);