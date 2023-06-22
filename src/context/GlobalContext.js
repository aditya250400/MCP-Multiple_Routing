import { createContext, useState } from "react";
import axios from "axios";
import imgPlaceholder from "../img/img-placeholder.png";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  
  const [products, setProducts] = useState([]);
  const [statusLoading, setStatusLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [statusButton, setStatusButton] = useState(false);
  const [idParam, setIdParam] = useState(null);
  const [imagePlaceholder, setImagePlaceholder] = useState(imgPlaceholder);
  const [inputData, setInputData] = useState({
    name: "",
    harga: 0,
    stock: 0,
    description: "",
    image_url: "",
    is_diskon: false,
    harga_diskon: 0,
    category: "",
  });

  const myFetchData = async () => {
    try {
      let response = await axios.get(
        "https://api-project.amandemy.co.id/api/products"
      );

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setStatusLoading(false);
    }
  };

  const resetInputData = () => {
    setInputData({
      name: "",
      harga: 0,
      stock: 0,
      description: "",
      image_url: "",
      is_diskon: false,
      harga_diskon: 0,
      category: "",
    });
    setStatusUpdate(false);
    setStatusButton(false);
  };
  const onCancel = () => {
    resetInputData();
    setStatusButton(false);
  };
  const handleInputChange = (event) => {
    const isChecked =
      event.target.name === "is_diskon"
        ? event.target.checked
        : event.target.value;
    setInputData({ ...inputData, [event.target.name]: isChecked });
    setStatusButton(event.target.value !== "" ? true : false);
  };
  

  return (
    <GlobalContext.Provider
      value={{
        products,
        statusButton,
        statusUpdate,
        inputData,
        idParam,
        imagePlaceholder,
        statusLoading,
        setImagePlaceholder,
        setProducts,
        myFetchData,
        setStatusButton,
        setStatusUpdate,
        setInputData,
        setStatusLoading,
        resetInputData,
        setIdParam,
        handleInputChange,
        onCancel,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
