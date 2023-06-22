import { Link } from "react-router-dom";

const CatalogBarang = ({ product }) => {
  const getTitle = () => {
    return product.name.length >= 40
      ? product.name.substring(0, 40) + "..."
      : product.name;
  };

  return (
    <>
      <div className="card w-40 md:w-72 bg-base-100 shadow-xl">
        <Link to={`/product/${product.id}`} className="block">
          <figure className="hover:bg-slate-200">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full object-cover h-44 md:h-64  rounded-t-lg "
            />
          </figure>
        </Link>

        <div className="p-3">
          <h2 className="text-left mb-3 text-xs md:text-xl ">{getTitle()}</h2>
          <div className="mx-1 mt-2">
            {product.isDiskon !== false && product.harga_diskon !== 0 ? (
              <>
                <h1 className="line-through text-xs md:text-md">
                  {product.harga_display}
                </h1>
                <h2 className="text-sm md:text-lg text-red-400 mt-2">
                  {product.harga_diskon_display}
                </h2>
              </>
            ) : (
              <h2 className="text-sm md:text-lg text-red-400">
                {product.harga_display}
              </h2>
            )}
          </div>
          <div className="md:flex md:justify-between p-2">
            <p className=" text-cyan-500 text-xs">Stock {product.stock}</p>
            <p className="bg-white text-cyan-400 border hover:cursor-pointer hover:bg-cyan-500 hover:text-white  active:bg-white active:text-cyan-500 border-cyan-500 rounded-lg w-16 text-center my-2 p-1 text-xs">
              {product.category}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogBarang;
