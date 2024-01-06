import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";


function PrivateRoute({children}){
    const {token}=useContext(AuthContext)

    if(token==null){
        return <Navigate to="/login" />
    }
    return children
}
export default PrivateRoute