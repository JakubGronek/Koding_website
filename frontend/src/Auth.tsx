import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { authValid } from "./useAuth";
import { API_BASE_URL } from "./globals";

interface AuthState {
    token: string,
    username: string,
}

interface AuthInterface {
    setAuth: ((token: string, username: string) => unknown),
}

export type AuthContextType = (AuthState & AuthInterface);

const AuthContext = createContext<AuthContextType>({
    token: null,
    username: null,
    setAuth: () => {}
});

const AuthProvider : React.FC<PropsWithChildren<unknown>> = ({children}) => {
    const stored = JSON.parse(window.localStorage.getItem("auth"));
    const [authState, setAuthState] = useState<AuthState>(stored ? stored : { token: null, username: null });


    const verifyUserLogin = async () => {
        const res = await fetch(API_BASE_URL + "/auth/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: authState.token
            },
            body: JSON.stringify({})
        });

        if (!res.ok) {
            console.log("Invalid session, dropping.");
            setAuthState({ token: null, username: null });
        }
    }

    useEffect(() => {
        if (authValid(authState.token)) {
            verifyUserLogin();
        } else {
            setAuthState({ token: null, username: null });
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("auth", JSON.stringify(authState));
    }, [authState]);

    const setAuth = async (token: string, username: string) => {
        setAuthState({
            token,
            username
        });
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
};


export { AuthProvider, AuthContext }