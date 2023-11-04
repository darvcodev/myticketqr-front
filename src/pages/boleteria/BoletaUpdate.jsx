import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ticketsAPI } from "../../api/api";
import Swal from "sweetalert2";

export const BoletaUpdate = () => {
  const { state: item } = useLocation();
  const navigate = useNavigate();

  const [comprador, setComprador] = useState(item.comprador || "");
  const [celular, setCelular] = useState(item.celular || "");
  const [oldCellular, setOldCellular] = useState(item.celular || "");
  const [estado, setEstado] = useState(item.estado || "");
  const [existCell, setExistCell] = useState(false);

  const checkExistCell = async () => {
    try {
      const response = await ticketsAPI.checkCellExistence(celular);
  
      if (response.exists && celular !== oldCellular) {
        setExistCell(true);
      } else {
        setExistCell(false);
      }
    } catch (error) {
      console.error("Error al verificar la existencia del número de celular:", error);
    }
  };
  
  useEffect(() => {
    checkExistCell();
  }, [celular, oldCellular]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (existCell) {
      Swal.fire({
        icon: "info",
        title: "Atención",
        text: "El número de celular ya existe.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    try {
      // Actualiza la boleta utilizando tu API
      await ticketsAPI.updateBoleta(item.id, {
        comprador: comprador,
        celular: celular,
        estado: estado,
      });
      Swal.fire({
        icon: "success",
        title: "Boleta actualizada",
        text: "La boleta se actualizó correctamente.",
        confirmButtonText: "Aceptar",
      });
      navigate("/boletas");
    } catch (error) {
      console.error("Hubo un error al actualizar la boleta.", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar la boleta.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="p-3 pt-8">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-black text-gray-300 text-center mb-6">
          Boleta N° <span className="text-amber-500">{item.nboleta}</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-900 px-8 py-6 rounded-lg border-2 border-gray-700"
        >
          <label className="text-gray-300 font-bold text-center">
            Nombre del comprador
          </label>
          <input
            type="text"
            name="comprador"
            value={comprador}
            onChange={(event) => setComprador(event.target.value)}
            className={`rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2`}
          />
          <label className="text-gray-300 font-bold text-center">Celular</label>
          <input
            type="number"
            name="celular"
            value={celular}
            onChange={(event) => setCelular(event.target.value)}
            className={`rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2`}
          />
          <label className="text-gray-300 font-bold text-center">
            Estado de pago:{" "}
            {item.estado === "Pagada" ? (
              <span className="text-green-500"> {item.estado}</span>
            ) : item.estado === "Abonada" ? (
              <span className="text-amber-500"> {item.estado}</span>
            ) : item.estado === "Anulada" ? (
              <span className="text-gray-500"> {item.estado}</span>
            ) : item.estado === "No pagada" ? (
              <span className="text-red-500"> {item.estado}</span>
            ) : (
              <span className="text-red-500"> {item.estado}</span>
            )}
          </label>
          <select
            name="estado"
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
            className="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2"
          >
            <option value="">Seleccionar...</option>
            <option value="Pagada">Pagada</option>
            <option value="Abonada">Abonada</option>
            <option value="No pagada">No pagada</option>
            <option value="Anulada">Anulada</option>
          </select>

          <button
            type="submit"
            className="w-full bg-amber-500 py-2 px-4 text-white rounded-lg mt-4"
          >
            Actualizar boleta
          </button>
        </form>
        <Link to="/boletas" className="text-blue-500 mt-4 underline text-xl">
          <div className="flex justify-center items-center">
            <ion-icon size="large" name="arrow-back-outline"></ion-icon>
            <p className="font-bold ml-2">Regresar a boletas</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
