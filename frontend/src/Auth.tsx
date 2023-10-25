import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { authValid } from "./useAuth";
import { callRemoteREST } from "./api/RESTCallRemote";

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

    useEffect(() => {
        if (authValid(authState.token)) {
            callRemoteREST({
                action: "/auth/user",
                method: "POST",
                token: authState.token,
                data: new Map<string, string>(),
                onComplete: (result) => {
                    let authStateNew: AuthState = Object.assign({}, authState);

                    if (!result.success) {
                        console.log("Invalid session, dropping.");
                        authStateNew = { token: null, username: null };
                    }

                    setAuthState(authStateNew);
                    window.localStorage.setItem("auth", JSON.stringify(authStateNew)); 
                }
            }) 
        }
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