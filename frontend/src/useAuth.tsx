import { useContext } from "react";
import { AuthContext, AuthContextType } from "./Auth";


const useAuth: () => AuthContextType = () => {
    const auth =  useContext(AuthContext);
    return auth;
}

const authValid = (a: string) => {
    return a != null;
}

export { useAuth, authValid };