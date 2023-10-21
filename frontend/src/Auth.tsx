import { PropsWithChildren, createContext, useEffect, useState } from "react";

type AuthState = {
    token: string | null,
    username: string | null,
}

type AuthInterface = {
    auth: (username: string, password: string) => unknown,
}

type AuthContextType = (AuthState & AuthInterface) | null;

const AuthContext = createContext<AuthContextType>(null);

const AuthProvider : React.FC<PropsWithChildren<unknown>> = ({children}) => {
    const [ authState, setAuthState ] = useState<AuthState>({
        token: null,
        username: null
    });

    useEffect(() => {
        window.localStorage.setItem("auth", JSON.stringify(authState));
    }, [ authState ]);

    const auth = async (username: string, password: string) => {
        setAuthState({
            token: password,
            username
        });
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            auth
        }}>
            {children}
        </AuthContext.Provider>
    )
};


export { AuthProvider, AuthContext }