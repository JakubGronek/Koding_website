import { Navigate, Outlet } from "react-router-dom";
import { authValid, useAuth } from "./useAuth";
import { useContext } from "react";
import { AuthDialogContext } from "./AuthDialog";

const ProtectedRoute : React.FC<React.PropsWithoutRef<{redirect: string}>> = ({redirect}) => {  
    const auth = useAuth();

    if (!authValid(auth.token)) {
        return <Navigate to={redirect} />;
    } else {
        return <Outlet />
    }
};

const ProtectedRoutePromptLogin : React.FC<React.PropsWithoutRef< { redirect: string }>> = ({ redirect }) => {
    const auth = useAuth();
    
    const { setOpen } = useContext(AuthDialogContext);

    if (auth.token == "") {
        setOpen(true);
        return <Navigate to={redirect} />;
    } else {
        return <Outlet />
    }
};

const UserlessRoute: React.FC<React.PropsWithoutRef<{ redirect : string}>> = ({ redirect }) => {
    return ProtectedRoute({ redirect });
};


export { ProtectedRoute, UserlessRoute, ProtectedRoutePromptLogin };