import { useParams, Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";

const DetailProduct = () => {
  const { id } = useParams();
  const {
    inputData,
    setInputData,
    statusLoading,
    setStatusLoading,
    resetInputData,
  } = useContext(GlobalContext);

  const myFetchDataId = async () => {
    try {
      let response = await axios.get(
        `https://api-project.amandemy.co.id/api/products/${id}`
      );
      setInputData(response.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    myFetchDataId();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="md:max-w-6xl md:mx-auto rounded-lg mx-8 bg-white py-8 mt-28 shadow-lg">
      {statusLoading ? (
        <div className="flex justify-center my-40">
          <span className="loading loading-spinner loading-lg text-cyan-500"></span>
        </div>
      ) : (
        <div className="md:flex md:gap-4 md:my-10">
          <>
            <div className="mx-auto w-60 my-auto w- md:w-1/2 md:ml-20">
              <div className="my-2">
                <h1 className="text-xl md:text-3xl">{inputData.name}</h1>
                <p className="text-sm text-gray-400">{inputData.category}</p>
              </div>
              <a href={inputData.image_url} target="blank">
                <img
                  src={inputData.image_url}
                  className="rounded-lg md:h-96"
                  alt={inputData.name}
                />
              </a>
            </div>
            <div className="basis-1/2 mt-4 md:mt-20 px-16 md:px-20">
              <h2 className="text-xl md:text-3xl">Deskripsi Produk :</h2>
              <div className="md:py-8 ">
                <div className="">
                  {inputData.isDiskon !== false &&
                  inputData.harga_diskon !== 0 ? (
                    <>
                      <h1 className="line-through text-xs md:text-lg mb-1">
                        {inputData.harga_display}
                      </h1>
                      <h2 className="text-red-400 text-sm md:text-2xl">
                        Harga : {inputData.harga_diskon_display}
                      </h2>
                    </>
                  ) : (
                    <h2 className="text-red-400 text-sm md:text-2xl">
                      Harga : {inputData.harga_display}
                    </h2>
                  )}
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <h2 className=" text-lg md:text-xl">Deskripsi :</h2>
                <p className="text-xs md:text-lg px-2">
                  {inputData.description}
                </p>
              </div>
              <div className="">
                <p className="text-cyan-500 mt-2 font-bold">
                  Stock : {inputData.stock}
                </p>
              </div>
              <div className="flex justify-end py-10">
                <Link to="/" className="btn btn-info text-white">
                  <button onClick={() => resetInputData()}>Back</button>
                </Link>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
