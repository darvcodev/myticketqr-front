import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ticketsAPI } from "../../api/api";

const EstadoBoleta = ({ estado }) => {
  const estados = {
    Pagada: "text-green-500 font-bold",
    Abonada: "text-amber-500 font-bold",
    "No pagada": "text-red-500 font-bold",
    Anulada: "text-gray-500 font-bold",
    Error: "text-red-500 font-bold",
  };

  const estadoClase = estados[estado] || estados["Error"];

  return <span className={estadoClase}>{estado}</span>;
};

const BoletaItem = ({ boleta, onEditClick, onViewClick }) => {
  return (
    <div
      className="bg-gray-900 rounded-lg border-2 border-gray-700"
      key={boleta._id}
    >
      <div className="grid grid-cols-2 gap-4 p-4">
        <InfoItem label="N° Boleta" value={boleta.nboleta} />
        <InfoItem label="Comprador" value={boleta.comprador} />
        <InfoItem label="Celular" value={boleta.celular} />
        <InfoItem
          label="Estado"
          value={<EstadoBoleta estado={boleta.estado} />}
        />
        <InfoItem
          label="Precio"
          value={`$ ${boleta.precio
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
        />
        <InfoItem label="Validada" value={boleta.validada ? "✅" : "❌"} />
        <hr className="col-span-2 border-gray-700" />
        <button
          onClick={onEditClick}
          className={`col-span-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg ${
            boleta.validada ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          disabled={boleta.validada}
        >
          Editar
        </button>
        <button
          onClick={onViewClick}
          className="col-span-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Ver boleta
        </button>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <>
      <div className="col-span-1 text-white font-bold text-xl border-r border-b border-gray-700 pb-2">
        {label}:
      </div>
      <div className="font-normal col-span-1 text-white text-xl border-l border-b border-gray-700 pb-2 pl-2">
        {value}
      </div>
    </>
  );
};

export const MisBoletas = () => {
  const [boletas, setBoletas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTickets = await ticketsAPI.getAll();
        const userId = localStorage.getItem("userId");
        const userTickets = allTickets.filter(
          (ticket) => ticket.userId === userId
        );
        setBoletas(userTickets);
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
        {boletas.map((boleta) => (
          <BoletaItem
            key={boleta._id}
            boleta={boleta}
            onEditClick={() =>
              navigate(`/boleta-update/${boleta.userId.timestamp}`, {
                state: boleta,
              })
            }
            onViewClick={() =>
              navigate(`/boleta-detail/${boleta.userId.timestamp}`, {
                state: boleta,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
