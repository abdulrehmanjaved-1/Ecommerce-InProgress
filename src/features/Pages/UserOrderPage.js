import Navbar from "../navbar/Navbar";
import UserOrders from "../user/components/UserOrders";

function UserOrderPage() {
  return <div>
    <Navbar>
        <h1 className="mx-auto text-3xl">My Orders</h1>
    <UserOrders></UserOrders>
    </Navbar>
  </div>;
}

export default UserOrderPage;
