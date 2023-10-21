import { useContext } from "react";
import { AuthContext } from "./Auth";

const useAuth = () => {
    const auth =  useContext(AuthContext);
    if (auth?.token != null) {
        return auth;
    } else return null;
}

export { useAuth };