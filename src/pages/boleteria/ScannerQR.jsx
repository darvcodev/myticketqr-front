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
          const validationResponse = await ticketsAPI.validateBoleta(
            result["data"]
          );

          if (validationResponse.success) {
            // La boleta se validó con éxito
            Swal.fire({
              icon: "success",
              title: "Boleta validada",
              text: "La boleta se validó correctamente.",
              confirmButtonText: "Aceptar",
            });
          } else {
            // Mostrar mensaje de alerta en caso de error o boleta no válida
            Swal.fire({
              icon: "info",
              title: "Atención",
              text: validationResponse.message,
              confirmButtonText: "Aceptar",
            });
          }
        } catch (error) {
          console.error("Error al validar la boleta:", error);
          // Mostrar mensaje de error en caso de error en la validación
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al validar la boleta.",
            confirmButtonText: "Aceptar",
          });
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

      <button
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => window.location.reload()}
      >
        Escanear otro QR
      </button>
    </div>
  );
};
