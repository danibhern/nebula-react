import React from 'react'
import First from '../organisms/First'
import Second from '../organisms/Second'
import Promo_mes from '../organisms/Promo_mes'
import Reserva_Form from '../organisms/Reserva_Form'
import Footer from '../organisms/Footer'


export default function Home({ auth }) {
  return (
    <>
    <First auth={auth} />
    <Second/>
    <Promo_mes/>
    <Reserva_Form/>
    <Footer/>
    </>
  )
}