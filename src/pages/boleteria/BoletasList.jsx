import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { ticketsAPI } from "../../api/api";

export const BoletasList = () => {
  const [boletas, setBoletas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const userTickets = await ticketsAPI.getAll(userId);
        const filteredBoletas = userTickets
          .filter((boleta) => boleta.userId === userId)
          .sort((a, b) => b.nboleta - a.nboleta);

        setBoletas(filteredBoletas);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener las boletas del usuario:", error);
      }
    };

    fetchData();
  }, []);

  const renderTickets = () => {
    return boletas.map((boleta) => (
      <tr key={boleta._id} className="border-b bg-gray-900 border-gray-700">
        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
          {boleta.nboleta}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {boleta.comprador}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {boleta.celular}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          <span className={`text-${boleta.estadoColor} font-bold`}>
            {boleta.estado}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          $ {boleta.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          ${" "}
          {(25000 - boleta.precio)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {boleta.userId.timestamp}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white text-center">
          {boleta.validada ? "✅" : "❌"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white text-center">
          <button
            onClick={() =>
              navigate(`/boleta-detail/${boleta.id}`, { state: boleta })
            }
            className="mr-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            <div className="flex items-center justify-center">👁️</div>
          </button>
          <button
            onClick={() =>
              navigate(`/boleta-update/${boleta.id}`, { state: boleta })
            }
            className={`mr-3 bg-amber-500 hover-bg-amber-600 text-white font-bold py-3 px-4 rounded-lg ${
              boleta.validada
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            disabled={boleta.validada}
          >
            <div className="flex items-center justify-center">✏️</div>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl font-black text-gray-300 pt-6 mb-6 text-center">
            Boletas{" "}
            <span className="text-amber-500">
              {boletas.filter((boleta) => boleta.estado !== "Anulada").length}
            </span>
          </h1>
          <div className="relative overflow-x-auto lg:px-6 pb-4">
            <table className="w-full text-left text-gray-400">
              <thead className="uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #Boleta
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Comprador
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Celular
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Falta pagar
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Vendedor
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Validada
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-800">
                {renderTickets()}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
