import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "../Context/PrivateRoute";
import Preview from "../Pages/Preview";


function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/preview/:id" element={<Preview/>}/>
        </Routes>
    )
}

export default AllRoutes