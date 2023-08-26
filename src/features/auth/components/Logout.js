import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, selectloggedInUserToken, signOutAsync } from "../loginSlice";
import { Navigate } from "react-router-dom";

function Logout() {
    const dispatch=useDispatch();
    const user=useSelector(selectloggedInUserToken)
    useEffect(()=>{
        dispatch(signOutAsync())
    },[])
  return <>
  {!user && <Navigate to='/login' replace={true}></Navigate>}
  </>;
}

export default Logout;
