import { useContext,useDebugValue  } from "react";
import AuthContext from "../context/AuthProvider";

/*
    COPIED CODE:
    Followed this playlist https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd
*/
const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;