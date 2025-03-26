import Image from "next/image";
import './globals.css'
import HomeKarusel from "../pages/Home/HomeKarusel"
import Navbar from "../pages/Navbar"
import Footer from "../pages/Footer"
import HomeDiscounted from "@/pages/Home/HomeDiscounted";
import ChegirmadagiMahsulotlar from '../pages/Home/HomeChegirmaMahsulotlar'
import HomeYangiMahsulotlar from '../pages/Home/HomeYangiMahsulotlar'
import HomeTopProducts from '../pages/Home/HomeTopProducts'
export default function Home() {
  return (
      <div>
        <Navbar/>
        <HomeKarusel/>
          {/* <HomeDiscounted/> */}
          {/* <ChegirmadagiMahsulotlar/> */}
           <HomeYangiMahsulotlar/>
           {/* <HomeTopProducts /> */}
          <Footer/>

      </div>
  );
}
