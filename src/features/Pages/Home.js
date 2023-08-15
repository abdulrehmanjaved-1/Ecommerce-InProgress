import ProductList from "../product/components/ProductList";
import Navbar from "../navbar/Navbar";
import Footer from "../common/Footer";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Footer></Footer>
    </div>
  );
}

export default Home;
