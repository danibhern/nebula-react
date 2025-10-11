import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Resenas from "./components/pages/Resenas";
import LoginPage from "./components/pages/Login";
import Carrito from "./components/pages/Carrito"; 
import Catalogo from "./components/pages/Catalogo";
import AdminDashboard from "./components/organisms/AdminDashboard";
import PortalPagos from "../src/components/pages/PortalPagos";
import Perfil from "../src/components/pages/Perfil";
import EmployeeDashboard from "./components/organisms/EmpDashboard";
import Registro from "./components/organisms/Registro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/resenas" element={<Resenas />} />
        <Route path="/inicio_sesion" element={<LoginPage />} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/emp1" element={<EmployeeDashboard/>}/>
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pagos" element={<PortalPagos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
