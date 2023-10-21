import { PropsWithChildren, createContext, useEffect, useState } from "react";

type AuthState = {
    token: string,
    username: string,
}

type AuthInterface = {
    setAuth: ((token: string, username: string) => unknown),
}

export type AuthContextType = (AuthState & AuthInterface);

const AuthContext = createContext<AuthContextType>({
    token: "",
    username: "",
    setAuth: () => {}
});

const AuthProvider : React.FC<PropsWithChildren<unknown>> = ({children}) => {
    const [ authState, setAuthState ] = useState<AuthState>({
        token: "",
        username: ""
    });

    useEffect(() => {
        const stored = JSON.parse(window.localStorage.getItem("auth"));
        setAuthState(stored);
    }, [])

    useEffect(() => {
        window.localStorage.setItem("auth", JSON.stringify(authState));      
    }, [ authState ]);

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