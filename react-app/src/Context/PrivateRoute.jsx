import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";


function PrivateRoute({children}){
    const {isAuth}=useContext(AuthContext)

    //if isAuth is false, then user will be navigate to login page
    if(!isAuth){
        return <Navigate to="/login" />
    }
    return children
}
export default PrivateRoute