import { Routes, Route } from "react-router-dom";
import {
  Inicio,
  BoletaCreate,
  ScannerQR,
  BoletasList,
  BoletaDetail,
  BoletaUpdate,
  MisBoletas,
  NotFound,
  Login,
} from "../pages";
import { NavBar } from "../components/NavBar";

export const AppNavigate = () => {
  return (
    <div className="App mt-16">
      {localStorage.getItem("userId") && <NavBar />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boleta-create" element={<BoletaCreate />} />
        <Route path="/boleta-detail/:id" element={<BoletaDetail />} />
        <Route path="/boleta-update/:id" element={<BoletaUpdate />} />
        <Route path="/boletas" element={<BoletasList />} />
        <Route path="/mis-boletas" element={<MisBoletas />} />
        <Route path="/scanner-qr" element={<ScannerQR />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
