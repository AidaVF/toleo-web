import React from "react"; 
import logo from './assets/toleologo.png'
import boegimg from './assets/boeg2.png'
 
function Cancel() { 
  return ( 
    <div id="main" className="App text-white bg-black">
      <div className="grid grid-cols-2" id="header">
        <div className="" id="">
          <a href="/"><img src={logo} className="logo"></img></a>
        </div>
        <div className="" id="">
          
        </div>
      </div>
      <div className="grid grid-cols-2 mt-20" id="banner">
        <div className="" id="headerimage">
          <div className="mx-auto" id="">
            <img src={boegimg} className="mx-auto w-1/2"></img>
          </div>
        </div>
        <div className="mr-10 md:mr-40" id="buysection">
          <h1 className="maintitle text-right text-4xl lg:text-6xl 2xl:text-8xl">Die Bezahlung hat nicht geklappt!</h1>
          <p className="lead text-right text-lg lg:text-2xl 2xl:text-4xl">Die Bezahlung per Karte hat leider nicht funktioniert. Bitte kontaktieren Sie ihre Zahlungsdienstleister.</p>
          <a href="/"><button className="mt-8   float-right text-lg lg:text-2xl 2xl:text-3xl" id="openModalBtn" >Zur Startseite</button></a>
        </div>
      </div>
      <div className="mt-36 grid grid-cols-5 pt-8 pb-8" id="footer">
        <p></p>
        <p className="">AGB</p>
        <a href="/impressum"><p className="">Impressum</p></a>
        <a href="mailto:team@toleo.ch"><p className="">team@toleo.ch</p></a>
        <p></p>
      </div>
    </div> 
  ); 
} 
 
export default Cancel; 