import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ticketsAPI } from "../../api/api";
import { v4 as uuidv4 } from "uuid";

export const MisBoletas = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tickets = await ticketsAPI.getAll();

        const ticketsWithIds = tickets.map((item) => ({
          ...item,
          id: uuidv4(),
        }));

        setList(ticketsWithIds);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-3 pt-8">
      <h1 className="text-4xl font-black text-gray-300 text-center mb-6">
        Mis Boletas
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {list.map((item) => (
          <div
            className="bg-gray-900 rounded-lg border-2 border-gray-700"
            key={item.id}
          >
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="col-span-1 text-white font-bold text-xl border-r border-b border-gray-700 pb-2">
                N° Boleta:
              </div>
              <div className="font-normal col-span-1 text-amber-500 text-xl border-l border-b border-gray-700 pb-2 pl-2">
                {item.nboleta}
              </div>
              <div className="col-span-1 text-white font-bold text-xl border-r border-b border-gray-700 pb-2">
                Comprador:
              </div>
              <div className="font-normal col-span-1 text-white text-xl border-l border-b border-gray-700 pb-2 pl-2">
                {item.comprador}
              </div>
              <div className="col-span-1 text-white font-bold text-xl border-r border-b border-gray-700 pb-2">
                Celular:
              </div>
              <div className="font-normal col-span-1 text-white text-xl border-l border-b border-gray-700 pb-2 pl-2">
                {item.celular}
              </div>
              <div className="col-span-1 text-white font-bold text-xl border-r border-b border-gray-700 pb-2">
                Estado:
              </div>
              <div className="font-normal col-span-1 text-white text-xl border-l border-b border-gray-700 pb-2 pl-2">
                {item.estado === "Pagada" ? (
                  <span className="text-green-500 font-bold">Pagada</span>
                ) : item.estado === "Abonada" ? (
                  <span className="text-amber-500 font-bold">Abonada</span>
                ) : item.estado === "No pagada" ? (
                  <span className="text-red-500 font-bold">No pagada</span>
                ) : item.estado === "Anulada" ? (
                  <span className="text-gray-500 font-bold">Anulada</span>
                ) : (
                  <span className="text-red-500 font-bold">Error</span>
                )}
              </div>
              <div className="col-span-1 text-white font-bold text-xl border-r border-b border-gray-700 pb-2">
                Precio:
              </div>
              <div className="font-normal col-span-1 text-white text-xl border-l border-b border-gray-700 pb-2 pl-2">
                {item.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div className="col-span-1 text-white font-bold text-xl border-r border-b border-gray-700 pb-2">
                Validada:
              </div>
              <div className="font-normal col-span-1 text-white text-xl border-l border-b border-gray-700 pb-2 pl-2">
                {item.validada ? "✅" : "❌"}
              </div>
              <hr className="col-span-2 border-gray-700" />
              <button
                onClick={() =>
                  navigate(`/boleta-update/${item.userId.timestamp}`, {
                    state: item,
                  })
                }
                className={`col-span-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg ${
                  item.validada
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
                disabled={item.validada}
              >
                Editar
              </button>
              <button
                onClick={() =>
                  navigate(`/boleta-detail/${item.userId.timestamp}`, {
                    state: item,
                  })
                }
                className="col-span-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Ver boleta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
