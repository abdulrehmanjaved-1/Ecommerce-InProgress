import { useEffect } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "../cart/CartSlice";
import {selectLoggedInUser, selectloggedInUserToken} from "../../features/auth/loginSlice"
import { resetOrder } from "../order/OrderSlice";
function OrderSuccessPage() {
  const dispatch = useDispatch();
  const user=useSelector(selectloggedInUserToken)
  const params = useParams();
  useEffect(() => {
    dispatch(resetCartAsync())
    dispatch(resetOrder())
  }, [dispatch]);
  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check from My account {">"} Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go Back Home
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccessPage;
