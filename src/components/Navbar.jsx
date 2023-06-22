import logo from "../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const location = useLocation();
  const { resetInputData } = useContext(GlobalContext);
  return (
    <header className="shadow-lg py-4 bg-white px-12 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl flex justify-center md:justify-between">
        <div>
          <Link to="/" onClick={() => resetInputData()}>
            <img src={logo} alt="logo" className="w-0 md:w-36" />
          </Link>
        </div>
        <ul className="flex items-center gap-6 text-cyan-500 text-xl md:mr-40">
          <Link
            to="/"
            onClick={() => resetInputData()}
            className={
              location.pathname === "/"
                ? "bg-cyan-500 text-white p-2 rounded-lg"
                : ""
            }
          >
            <button className="mx-4">Home</button>
          </Link>
          <Link
            to="/table"
            onClick={() => resetInputData()}
            className={
              location.pathname === "/table"
                ? "bg-cyan-500 text-white p-2 rounded-lg w-20"
                : ""
            }
          >
            <button className="mx-2">Table</button>
          </Link>
        </ul>
        <div className="flex items-center gap-4"></div>
      </nav>
    </header>
  );
};

export default Navbar;
