import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams, useNavigate, Link } from "react-router-dom";

import axios from "axios";

const FormUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    inputData,
    handleInputChange,
    imagePlaceholder,
    setInputData,
    setStatusLoading,
    statusLoading,
    myFetchData,
    resetInputData,
    setStatusUpdate,
  } = useContext(GlobalContext);

  const myFetchDataId = async () => {
    try {
      let response = await axios.get(
        `https://api-project.amandemy.co.id/api/products/${id}`
      );
      setInputData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setStatusLoading(false);
    }
  };
  const onUpdate = async () => {
    try {
      // eslint-disable-next-line
      let putData = await axios.put(
        `https://api-project.amandemy.co.id/api/products/${id}`,
        inputData
      );

      alert(`Berhasil Update data dengan id ${id}`);
      myFetchData();
      resetInputData();
      setStatusUpdate(false);
      navigate("/table");
    } catch (error) {
      alert(error.response.data.info);
      console.log(error.response.data.info);
    }
  };

  useEffect(() => {
    myFetchDataId();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="px-3 md:px-8">
      <section className="max-w-6xl mx-auto shadow-lg rounded-lg bg-white p-8 my-8">
        <h1 className="text-2xl text-cyan-500 text-center">Update Product</h1>
        {statusLoading ? (
          <div className="flex justify-center my-40">
            <span className="loading loading-spinner loading-lg text-cyan-500"></span>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:grid md:grid-cols-5 gap-x-6 gap-y-4 my-2">
              <div className="col-span-3">
                <label className="block mb-1"> Nama Barang</label>
                <input
                  type="text"
                  name="name"
                  value={inputData.name}
                  className="block border border-gray-400 rounded-md w-full px-2 py-1 text-sm"
                  placeholder="Masukkan Nama Barang"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1"> Stock Barang</label>
                <input
                  type="text"
                  name="stock"
                  value={inputData.stock}
                  className="block border border-gray-400 rounded-md w-full px-2 py-1 text-sm"
                  placeholder="Masukkan Stock Barang"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1"> Harga Barang</label>
                <input
                  type="text"
                  name="harga"
                  value={inputData.harga}
                  className="block border border-gray-400 rounded-md w-full px-2 py-1 text-sm"
                  placeholder="Masukkan Harga Barang"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center justify-center mt-4 gap-3">
                <input
                  type="checkbox"
                  className=""
                  checked={inputData.is_diskon}
                  name="is_diskon"
                  onChange={handleInputChange}
                />
                <label className="">Status Diskon</label>
              </div>
              <div className="col-span-2">
                {inputData.is_diskon === true && (
                  <>
                    <label className="block mb-1"> Harga Diskon</label>
                    <input
                      type="text"
                      name="harga_diskon"
                      value={inputData.harga_diskon}
                      onChange={handleInputChange}
                      className="block border border-gray-400 rounded-md w-full px-2 py-1 text-sm"
                      placeholder="Masukkan Harga Diskon"
                    />
                  </>
                )}
              </div>
              <div className="col-span-2">
                <label className="block mb-1"> Kategori Barang</label>
                <select
                  name="category"
                  value={inputData.category}
                  className="w-full py-1 px-2 rounded-md bg-white border border-gray-400"
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="teknologi">Teknologi</option>
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                  <option value="hiburan">Hiburan</option>
                  <option value="kendaraan">Kendaraan</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block mb-1 flex justify-center">
                  Gambar Barang
                </label>
                <div className="flex justify-center my-2">
                  <img
                    src={
                      inputData.image_url !== ""
                        ? inputData.image_url
                        : imagePlaceholder
                    }
                    alt="placeholder"
                    className=" h-40 border p-2"
                  />
                </div>
                <input
                  type="text"
                  name="image_url"
                  value={inputData.image_url}
                  className="block border border-gray-400 rounded-md w-full px-2 py-1 text-sm"
                  placeholder="Masukkan Image URL"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-5">
                <label className="block mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  rows="6"
                  className="w-full py-1 px-2 rounded-md bg-white border border-gray-400"
                  value={inputData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center p-4 my-4 gap-4 md:justify-end  ">
              <>
                <button
                  className="btn btn-success px-4 py-1 text-slate-600 text-white"
                  onClick={onUpdate}
                >
                  Update
                </button>
                <Link to="/table" className="block">
                  <button
                    className="btn btn-info text-white"
                    onClick={resetInputData}
                  >
                    Back
                  </button>
                </Link>
              </>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default FormUpdate;
