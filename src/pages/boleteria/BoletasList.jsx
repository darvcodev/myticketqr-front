import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { ticketsAPI } from "../../api/api";
import { v4 as uuidv4 } from "uuid";

export const BoletasList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const userTickets = await ticketsAPI.getAll(userId);

        const filteredList = userTickets.filter(
          (item) => item.estado !== "Anulada"
        );

        filteredList.forEach((item) => {
          item.id = uuidv4();
        });

        filteredList.sort((a, b) => b.nboleta - a.nboleta);
        setList(filteredList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener las boletas del usuario:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl font-black text-gray-300 pt-6 mb-6 text-center">
            Boletas{" "}
            <span className="text-amber-500">
              {list.filter((item) => item.estado !== "Anulada").length}
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
                {list.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b bg-gray-900 border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {item.nboleta}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {item.comprador}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {item.celular}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {item.estado === "Pagada" ? (
                        <span className="text-green-500 font-bold">Pagada</span>
                      ) : item.estado === "Abonada" ? (
                        <span className="text-amber-500 font-bold">
                          Abonada
                        </span>
                      ) : item.estado === "No pagada" ? (
                        <span className="text-red-500 font-bold">
                          No pagada
                        </span>
                      ) : item.estado === "Anulada" ? (
                        <span className="text-gray-500 font-bold">Anulada</span>
                      ) : (
                        <span className="text-red-500 font-bold">Error</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      ${" "}
                      {item.precio
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      ${" "}
                      {(25000 - item.precio)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white text-center">
                      {item.validada ? "✅" : "❌"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white text-center">
                      <button
                        onClick={() =>
                          navigate(`/boleta-detail/${item.id}`, { state: item })
                        }
                        className="mr-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg"
                      >
                        <div className="flex items-center justify-center">
                          👁️
                        </div>
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/boleta-update/${item.id}`, { state: item })
                        }
                        className={`mr-3 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg ${
                          item.validada
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                        disabled={item.validada}
                      >
                        <div className="flex items-center justify-center">
                          ✏️
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
