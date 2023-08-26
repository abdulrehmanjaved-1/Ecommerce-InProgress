import Footer from "../common/Footer";
import Navbar from "../navbar/Navbar";
import ProductDetails from "../product/components/ProductDetails"

function ProductDetailspage() {
  return <div>
    <Navbar>
    <ProductDetails></ProductDetails>
    </Navbar>
    <Footer></Footer>
  </div>;
}

export default ProductDetailspage;
