import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Resenas from "./components/pages/Resenas";
import LoginPage from "./components/pages/Login";
import Carrito from "./components/pages/Carrito"; 
import Catalogo from "./components/pages/Catalogo";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/resenas" element={<Resenas/>}/>
        <Route path="/inicio_sesion" element={<LoginPage />} />
        <Route path="/catalogo" element={<Catalogo/>} />
         <Route path="/carrito" element={<Carrito/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
