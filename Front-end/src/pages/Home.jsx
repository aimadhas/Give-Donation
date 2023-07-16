import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from "../components/Hero"
import Cards from "../components/Cards"
import Secondsection from "../components/Secondsection"
import Slides from "../components/Slides"
import Element from "../components/element"
import Mission from "../components/Mission"

const Home = () => {
  return (
    <div>
      <Header/>
        <Hero/>
        <Cards/>
        <Secondsection/>
        <Slides/>
        <Element/>
        <Mission/>
      <Footer/>
    </div>
  )
}

export default Home
