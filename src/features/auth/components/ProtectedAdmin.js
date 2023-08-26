import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, selectloggedInUserToken } from "../loginSlice";
import { selectUserInfo } from "../../user/Userslice";

function ProtectedAdmin({children}) {
    const user = useSelector(selectloggedInUserToken)
    const userInfo=useSelector(selectUserInfo)
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(userInfo && userInfo && userInfo.role!='admin'){
        return <Navigate to='/' replace={true}></Navigate>
    }
    return children;
}

export default ProtectedAdmin;