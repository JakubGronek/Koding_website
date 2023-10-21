import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute : React.FC<React.PropsWithoutRef<{redirect: string}>> = ({redirect}) => {
    const auth = useAuth();
    

    if (!auth) {
        return <Navigate to={redirect} />;
    } else {
        console.log("a");
        return <Outlet />
    }
};

const UserlessRoute: React.FC<React.PropsWithoutRef<{ redirect: string }>> = ({ redirect }) => {
    const auth = useAuth();

    if (auth) {
        return <Navigate to={redirect} />;
    } else {
        return <Outlet />
    }
};


export { ProtectedRoute, UserlessRoute };