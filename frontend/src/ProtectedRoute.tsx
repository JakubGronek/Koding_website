import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useContext } from "react";
import { AuthDialogContext } from "./AuthDialog";

const ProtectedRoute : React.FC<React.PropsWithoutRef<{redirect: string, t?: boolean}>> = ({redirect, t}) => {
    t = typeof t !== "undefined" ? t : true;
    
    const auth = useAuth();

    console.log(`protected ${redirect}, ${t}, ${auth.token} ${auth.token != "" ? "" : "[no token]"}`)

    if (t && auth.token == "") {
        return <Navigate to={redirect} />;
    } else {
        return <Outlet />
    }
};

const ProtectedRoutePromptLogin : React.FC<React.PropsWithoutRef< { redirect: string }>> = ({ redirect }) => {
    const auth = useAuth();

    console.log(`protected_prompt ${redirect}, ${auth.token} ${auth.token != "" ? "" : "[no token]"}`)
    const { setOpen } = useContext(AuthDialogContext);

    if (auth.token == "") {
        setOpen(true);
        return <Navigate to={redirect} />;
    } else {
        return <Outlet />
    }
};

const UserlessRoute: React.FC<React.PropsWithoutRef<{ redirect : string}>> = ({ redirect }) => {
    return ProtectedRoute({ redirect, t: false });
};


export { ProtectedRoute, UserlessRoute, ProtectedRoutePromptLogin };