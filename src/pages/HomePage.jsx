import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CatalogBarang from "../components/CatalogBarang";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  const { products, myFetchData, statusLoading } = useContext(GlobalContext);

  useEffect(() => {
    myFetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto my-8">
        <h1 className="text-cyan-500 text-3xl text-center">Catalog products</h1>
      </div>
      <div className="flex justify-center  p-2 flex-row flex-wrap items-stretch gap-4 items-center p-4 mt-4">
        {statusLoading ? (
          <div className="flex justify-center my-40">
            <span className="loading loading-spinner loading-lg text-cyan-500"></span>
          </div>
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <CatalogBarang product={product} key={product.id} />
          ))
        ) : (
          <p>Belum ada produk</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
