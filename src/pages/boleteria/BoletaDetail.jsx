import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import * as htmlToImage from "html-to-image";
import QRCode from "qrcode";

import "../../styles/Boleta.css";
import { Loader } from "../../components/Loader";

export const BoletaDetail = () => {
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state: item } = useLocation();
  const datos = item;

  useEffect(() => {
    if (datos !== null) {
      QRCode.toDataURL(datos._id || "")
        .then((url) => {
          setQrCode(url);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const downloadQR = () => {
    // Crear un div temporal para contener el contenedor QR
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    document.body.appendChild(tempContainer);
    ReactDOM.render(boletaContainer, tempContainer);

    // Llamar a htmlToImage para capturar la imagen
    htmlToImage.toPng(tempContainer.firstChild).then((dataUrl) => {
      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement("a");
      link.download = `${datos?._id || ""}-qr.png`;
      link.href = dataUrl;
      link.click();

      // Eliminar el div temporal
      document.body.removeChild(tempContainer);
    });
  };

  const boletaContainer = (
    <div className="max-w-sm w-full h-full mx-auto bg-white rounded-3xl">
      <img src="/logo-mira.png" className="mira-top" />
      <img src="/feria.png" className="feria-top" />
      <div className="flex flex-col">
        <div className="bg-blue-800 relative rounded-3xl p-4 m-3 bg-boleta">
          <div className="flex-none sm:flex">
            <div className="flex-auto justify-evenly">
              <div className="flex justify-center items-center px-4">
                <div className="flex flex-col text-center">
                  <div className="flex items-center mx-auto">
                    <img src="/miraista.png" className="w-full mt-16" />
                  </div>
                  <h1 className="text-center font-bold text-3xl text-amber-500 -mt-4 py-2 uppercase">
                    {datos?.comprador === null
                      ? ""
                      : datos?.comprador.substring(
                          0,
                          datos?.comprador.indexOf(" ")
                        )}
                  </h1>
                  <p className="font-semibold text-white">
                    ¡Compartamos juntos este gran evento!
                  </p>
                </div>
              </div>
              <div className="border-b border-dashed my-4">
                <div className="absolute rounded-full w-6 h-6 bg-white -mt-3 -left-2"></div>
                <div className="absolute rounded-full w-6 h-6 bg-white -mt-3 -right-2"></div>
              </div>
              <div className="flex items-center px-4">
                <div className="flex items-center w-1/2">
                  <div className="text-5xl font-black mr-1 text-white">20</div>
                  <div>
                    <div className="font-bold text-lg text-white">Marzo</div>
                    <div className="font-bold text-lg text-white -mt-2">
                      2024
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center mr-4">
                  <div className="w-0.5 h-16 bg-white"></div>
                </div>
                <div className="flex flex-col items-center w-1/2 text-white">
                  <h1 className="text-center font-bold text-3xl">$30.000</h1>
                  <p className="text-center -mt-2">Por persona</p>
                </div>
              </div>
              <div className="border-b border-dashed pt-5">
                <div className="absolute rounded-full w-6 h-6 bg-white -mt-3 -left-2"></div>
                <div className="absolute rounded-full w-6 h-6 bg-white -mt-3 -right-2"></div>
              </div>
              <div className="flex flex-col pt-4 justify-center">
                <h6 className="text-2xl font-black text-gray-200 text-center mb-4">
                  Salón de eventos
                  <p className="text-center text-amber-400 text-lg">
                    {" "}
                    "Salón de eventos Roma"
                  </p>
                </h6>
                <img src={qrCode} className="w-1/2 mx-auto rounded-xl -mt-2" />
                <span className="text-center text-amber-400 mt-4 leading-tight -ml-2">
                  Presenta este código <br /> para ingresar al evento
                </span>
              </div>
            </div>
          </div>
          <img src="/captus.png" className="captus-bottom" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-3 pt-8">
      {datos?._id ? (
        <>
          {boletaContainer}
          <button
            onClick={downloadQR}
            className="bg-red-500 py-2 px-4 text-white rounded-lg mt-4 mx-auto block"
          >
            Descargar boleta
          </button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
