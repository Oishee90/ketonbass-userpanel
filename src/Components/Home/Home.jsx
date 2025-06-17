import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import CompletePurchase from "./CompletePurchase";
import Powerfulfeatures from "./Powerfulfeatures";
import Tools from "./Tools";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <CompletePurchase></CompletePurchase>
      <Powerfulfeatures></Powerfulfeatures>
      <Tools></Tools>
      <Footer></Footer>
    </div>
  );
}; 

export default Home;
