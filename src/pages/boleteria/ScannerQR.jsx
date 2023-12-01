import React, { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";
import Swal from "sweetalert2";
import { ticketsAPI } from "../../api/api";

export const ScannerQR = () => {
  const videoRef = useRef(null);
  const [qrResult, setQrResult] = useState("");
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (scanned) return;

    const scanner = new QrScanner(
      videoRef.current,
      async (result) => {
        setScanned(true);
        setQrResult(result["data"]);
        console.log(result["data"]);

        try {
          const response = await ticketsAPI.validateTicketById(result["data"]);

          if (response.error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se encontró ninguna boleta registrada con este QR.",
              confirmButtonText: "Aceptar",
            });
          } else if (response.validada) {
            Swal.fire({
              icon: "info",
              title: "Atención",
              text: "Esta boleta ya ha sido validada previamente.",
              confirmButtonText: "Aceptar",
            });
          } else if (response.estado === "Pagada") {
            Swal.fire({
              icon: "success",
              title: "Boleta validada",
              text: "La boleta se validó correctamente.",
              confirmButtonText: "Aceptar",
            });
          } else {
            Swal.fire({
              icon: "info",
              title: `Boleta: ${response.estado}`,
              text: `Esta boleta no puede ser validada.`,
              confirmButtonText: "Aceptar",
            });
          }
        } catch (error) {
          console.error(error);
        }
      },
      {
        onDecodeError: (error) => {
          setQrResult(error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    scanner.start();

    return () => scanner.stop();
  }, [scanned]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black text-gray-300 pt-6 text-center">
        Escanear QR
      </h1>
      <div className="p-4">
        <video ref={videoRef} className="qr-video" playsInline width="100%" />
      </div>
      {/* BOTÓN QUE REFRESCA LA PANTALLA */}
      <p className="text-2xl font-bold text-center pb-4">
        {qrResult ? (
          <span className="text-red-500">Boltea: {qrResult}</span>
        ) : (
          <span className="text-gray-300">Escanee un código QR</span>
        )}
      </p>
      <button
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => window.location.reload()}
      >
        Escanear otro QR
      </button>
    </div>
  );
};
