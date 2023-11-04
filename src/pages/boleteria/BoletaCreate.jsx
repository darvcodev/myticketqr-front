import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ticketsAPI } from "../../api/api";

export const BoletaCreate = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [users, setUsers] = useState({
    userId: userId,
    celular: "",
    comprador: "",
    estado: "",
    nBoleta: "001",
    precio: "",
    validada: false,
  });

  const [list, setList] = useState([]);
  const [subId, setSubId] = useState("");

  const handleEstadoChange = (e) => {
    const estado = e.target.value;
    let precio = 0;
    if (estado === "Pagada") {
      precio = 25000;
    } else if (estado === "Abonada") {
      precio = users.precio;
    }
    setUsers({ ...users, estado, precio });
  };

  const saveDate = async (e) => {
    e.preventDefault();

    e.preventDefault();

    let precio = 0;
    if (users.estado === "Pagada") {
      precio = 25000;
    } else if (users.estado === "Abonada") {
      precio = users.precio;
    } else if (users.estado === "No pagada") {
      precio = 0;
    }

    if (
      isNaN(precio) ||
      (users.estado === "Abonada" && (precio < 5000 || precio > 20000))
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El precio debe estar entre $5.000 y $20.000",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    precio = Math.round(precio / 1000) * 1000;

    const newRecord = {
      userId: userId,
      celular: users.celular.slice(0, 10),
      comprador: users.comprador,
      estado: users.estado,
      nBoleta: String(list.length + 1).padStart(3, "0"),
      precio: users.precio,
      validada: false,
    };

    console.log("Datos a enviar en la solicitud POST:", newRecord); // Agrega este console.log

    try {
      if (subId === "") {
        await ticketsAPI.create(newRecord);
      } else {
        await ticketsAPI.update(subId, newRecord);
      }
      setUsers({
        userId: userId,
        celular: "",
        comprador: "",
        estado: "",
        nBoleta: "001",
        precio: "",
        validada: false,
      });
      setSubId("");
      if (users.estado === "Pagada") {
        Swal.fire({
          icon: "success",
          title: `La boleta para ${newRecord.comprador}`,
          text: "Se ha creado correctamente.",
          confirmButtonText: "Aceptar",
        });
      } else if (users.estado === "Abonada") {
        Swal.fire({
          icon: "success",
          title: `La boleta para ${newRecord.comprador}`,
          text: `Se ha creado correctamente y se ha abonado $${newRecord.precio}.`,
          confirmButtonText: "Aceptar",
        });
      } else if (users.estado === "No pagada") {
        Swal.fire({
          icon: "success",
          title: `La boleta para ${newRecord.comprador}`,
          text: "Se ha creado correctamente, pero no se ha pagado.",
          confirmButtonText: "Aceptar",
        });
      }
      navigate(`/boleta-detail/${newRecord.celular}`, { state: newRecord });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boletas = await ticketsAPI.getAll();
        setList(boletas);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-3 pt-8">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-black text-gray-300 text-center mb-6">
          Crear boleta 🎫
        </h1>
        <form
          onSubmit={saveDate}
          className="w-full max-w-lg bg-gray-900 px-8 py-6 rounded-lg border-2 border-gray-700"
        >
          <label className="text-gray-300 font-bold text-center">
            Nombre del comprador
          </label>
          <input
            type="text"
            className={`rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2`}
            placeholder="Ingrese nombre y apellido"
            name="comprador"
            value={users.comprador}
            onChange={(e) => setUsers({ ...users, comprador: e.target.value })}
            required
          />
          <label className="text-gray-300 font-bold text-center">
            {" "}
            Celular
          </label>
          <input
            type="number"
            name="celular"
            className={`rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2`}
            placeholder="Ingrese el número de celular"
            onChange={(e) => setUsers({ ...users, celular: e.target.value })}
            value={users.celular}
            required
          />
          <label className="text-gray-300 font-bold text-center">
            Estado del pago
          </label>
          <select
            className={`rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2`}
            name="estado"
            value={users.estado}
            onChange={handleEstadoChange}
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Pagada">Pagada</option>
            <option value="Abonada">Abonada</option>
            <option value="No pagada">No pagada</option>
          </select>
          {users.estado === "Abonada" && (
            <>
              <label className="text-gray-300 font-bold text-center">
                Precio
              </label>
              <input
                className={`rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2`}
                type="number"
                placeholder="Ingrese el precio"
                value={users.precio}
                onChange={(e) => setUsers({ ...users, precio: e.target.value })}
              />
            </>
          )}
          <button
            type="submit"
            className={`w-full bg-blue-500 py-2 px-4 text-white rounded-lg mt-4`}
          >
            <div className="flex justify-center items-center">
              <p className="font-bold mr-2">GENERAR BOLETA</p>
              <ion-icon size="large" name="qr-code-outline"></ion-icon>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};
