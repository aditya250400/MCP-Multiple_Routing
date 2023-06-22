import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "react-modal";
const TableProducts = () => {
  const { products, myFetchData, statusLoading } = useContext(GlobalContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idProduct, setIdProduct] = useState(null);

  const openModal = (id) => {
    setModalIsOpen(true);
    setIdProduct(id);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setIdProduct(null);
  };

  useEffect(() => {
    myFetchData();
    // eslint-disable-next-line
  }, []);
  const onDelete = async () => {
    try {
      // eslint-disable-next-line
      let response = await axios.delete(
        `https://api-project.amandemy.co.id/api/products/${idProduct}`
      );
      closeModal();
      myFetchData();
      alert(`Berhasil hapus barang dengan id ${idProduct}`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="mx-2 md:mx-8 my-8">
      <h1 className="text-center text-3xl text-cyan-400">Table Products</h1>
      {statusLoading ? (
        <div className="flex justify-center my-40">
          <span className="loading loading-spinner loading-lg text-cyan-500"></span>
        </div>
      ) : (
        <>
          <div className="flex justify-end my-2 py-2 px-3  ">
            <Link
              to="/create"
              className="p-2 rounded-lg text-xs md:text-lg btn-info text-white"
            >
              Create Product +
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className=" table text-center bg-white">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Id Barang</th>
                  <th>Nama Barang</th>
                  <th>Harga Barang</th>
                  <th>Stock Barang</th>
                  <th>Gambar Barang</th>
                  <th>Deskripsi Barang</th>
                  <th>Status Diskon</th>
                  <th>Harga Diskon</th>
                  <th>Kategori Barang</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.harga}</td>
                      <td>{product.stock}</td>
                      <td>
                        <a href={product.image_url} target="blank">
                          <img src={product.image_url} alt={product.nama} />
                        </a>
                      </td>
                      <td>
                        <div className="h-32 overflow-auto ">
                          {product.description}
                        </div>
                      </td>
                      <td>{product.is_diskon ? "Aktif" : "Tidak Aktif"}</td>
                      <td>
                        {product.harga_diskon === 0
                          ? "-"
                          : product.harga_diskon}
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <div className="flex gap-2">
                          <Link to={`/update/${product.id}`}>
                            <button className="text-white btn btn-xs btn-success">
                              Update
                            </button>
                          </Link>
                          <button
                            className="text-white btn-xs btn btn-error"
                            onClick={() => openModal(product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="rounded-lg mx-8 mt-28 h-4/5  "
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="text-center md:mx-40 bg-white p-10 rounded-lg">
          <h1 className="text-lg block my-5">Apakah Anda yakin?</h1>
          <div>
            <button
              className="btn btn-error text-white mx-2"
              onClick={onDelete}
            >
              Hapus
            </button>
            <button
              className="btn btn-info text-white"
              onClick={() => closeModal()}
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TableProducts;
