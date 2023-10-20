import { PropsWithChildren, createContext, useContext, useState } from "react";

type AuthContextType = {
    token: string,
    username: string,
    auth: (username: string, password: string) => unknown
} | null;

const AuthContext = createContext<AuthContextType>(null);

const AuthProvider : React.FC<PropsWithChildren<unknown>> = ({children}) => {
    const [ token, setToken ] = useState<string>("");
    const [ username, setUsername ] = useState<string>("");

    const auth = async (login: string, password: string) => {
        setToken("abcd");
    }

    const fetchUserinfo = async () => {
        setUsername("abcd");
    }

    return (
        <AuthContext.Provider value={{
            token,
            auth,
            username
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthProvider, AuthContext }