import React from 'react';
import '../../styles/Login.css';  
import Footer from '../organisms/Footer';
import InicioSesion from '../organisms/InicioSesion';
import First from '../organisms/First';



export default function LoginPage() {


  return (
    <>
      <First/>
      <InicioSesion/>
      <Footer/>
    </>
  );
}
