import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/*
    COPIED CODE:
    Followed this playlist https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd
*/

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("______________________________________")
    console.log(auth[0])
    return (
        auth[1] == "Admin"
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/SuperheroList/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;