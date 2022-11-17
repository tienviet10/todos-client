import { NavigateFunction } from "react-router-dom";

export interface GoogleLogInOut {
    onClick: () => void
}

export type logInFunc = () => {
    login: (e: any) => Promise<void>;
    open: boolean;
    loading: boolean;
    error: string;
    success: string;
    email: string;
    password: string;
    buttonText: string;
    toggle: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    navigate: NavigateFunction;
    t: any;
};

export type SetLocalStorageType = (key: string, value: string) => void

export type RemoveLocalStorageType = (key: string) => void

export type GetLocalStorageType = (token: string) => string

export type StoreAuthenticationType = (token: string, accessToken: string) => void