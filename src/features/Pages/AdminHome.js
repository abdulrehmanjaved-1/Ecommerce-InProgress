import ProductList from "../product/components/ProductList";
import Navbar from "../navbar/Navbar";
import AdminProductList from "../../features/admin/components/AdminProductList"
function AdminHome() {
  return (
    <div>
      <Navbar> 
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
}

export default AdminHome;
