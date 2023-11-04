import { Link, useLocation } from "react-router-dom";
import Logo128 from "../assets/logo-miboleta-128.png";
import { useState } from "react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.removeItem("userId");
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 inset-x-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          onClick={() => handleCloseMenu()}
          className="flex items-center"
        >
          <img src={Logo128} className="w-10 h-10 mr-2" alt="Logo TicketQR" />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white -mt-1.5">
            Ticket QR
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                onClick={() => handleCloseMenu()}
                className={`block py-2 pl-4 text-white
                ${
                  location.pathname === "/"
                    ? "bg-blue-600 py-2 px-4 rounded-lg text-white"
                    : ""
                }`}
              >
                Generar QR
              </Link>
            </li>
            <li>
              <Link
                to="/scanner-qr"
                onClick={() => handleCloseMenu()}
                className={`block py-2 pl-4 text-white
                ${
                  location.pathname === "/scanner-qr"
                    ? "bg-blue-600 py-2 px-4 rounded-lg text-white"
                    : ""
                }`}
              >
                Escanear QR
              </Link>
            </li>
            <li>
              <Link
                to="/mis-boletas"
                onClick={() => handleCloseMenu()}
                className={`block py-2 pl-4 text-white
               ${
                 location.pathname === "/mis-boletas"
                   ? "bg-blue-600 py-2 px-4 rounded-lg text-white"
                   : ""
               }`}
              >
                Mis Boletas
              </Link>
            </li>
            <li>
              <Link
                to="/boletas"
                onClick={() => handleCloseMenu()}
                className={`block py-2 pl-4 text-white
               ${
                 location.pathname === "/boletas"
                   ? "bg-blue-600 py-2 px-4 rounded-lg text-white"
                   : ""
               }`}
              >
                Boletas
              </Link>
            </li>
            <li>
              <Link
                onClick={() => handleSignOut()}
                className={`block py-2 pl-4 text-red-400
                ${
                  location.pathname === "/"
                    ? "rounded-lg py-2 px-4 text-red-400"
                    : ""
                }`}
              >
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
