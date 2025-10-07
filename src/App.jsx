import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Resenas from "./components/pages/Resenas";
import LoginPage from "./components/pages/Login";
import Carrito from "./components/pages/Carrito"; 
<<<<<<< HEAD
import AdminDashboard from "./components/organisms/AdminDashboard";
=======
import Catalogo from "./components/pages/Catalogo";
>>>>>>> c1f9679c4259aacc85cc784a9905acb6dc4b35c6


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/resenas" element={<Resenas/>}/>
        <Route path="/inicio_sesion" element={<LoginPage />} />
<<<<<<< HEAD
        <Route path="admin" element={<AdminDashboard/>} />
        <Route path="/Pedidos" element={<Pedido/>} />
        <Route path="/carrito" element={<Carrito/>} />
=======
        <Route path="/catalogo" element={<Catalogo/>} />
         <Route path="/carrito" element={<Carrito/>} />
>>>>>>> c1f9679c4259aacc85cc784a9905acb6dc4b35c6
      </Routes>
    </BrowserRouter>
  );
}

export default App;
