import {createContext, useContext} from "react";

export type UserInfoContextSetting = {
    email?: string;
    setEmail: (a: string) => void;
    emailVerified: boolean;
    setEmailVerified: (b: boolean) => void;
}

export const UserInfoContext = createContext<UserInfoContextSetting>({
    email: undefined,
    setEmail: () => {},
    emailVerified: false,
    setEmailVerified: () => {}
});

export const useUserInfoContext = () => useContext(UserInfoContext);