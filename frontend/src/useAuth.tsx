import { useContext } from "react";
import { AuthContext, AuthContextType } from "./Auth";


const useAuth = () => {
    const auth =  useContext(AuthContext);
    return auth;
}

const authValid = (a) => {
    return a  != "";
}

export { useAuth, authValid };