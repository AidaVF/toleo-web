import React from "react"; 
import logo from './assets/toleologo.png'
import boegimg from './assets/boeg_final.png'
 
function Success() { 
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
        <div className="mr-10 md:mr-40 text-right" id="">
          <h1 className="maintitle text-right text-4xl lg:text-6xl 2xl:text-8xl">Herzlichen Dank für Ihren Kauf!</h1>
          <p>Wie erwähnt, überweisen Sie bitte den genannten Betrag an folgende Bankverbindung:</p><br></br>

                  <p>CH53 0844 0257 2399 8200 1</p><br></br>

                  <p>Alea AG</p>
                  <p>Schaffhauserstrasse 188</p>
                  <p>8057 Zürich</p>
                  <br></br>
                  <p>Wichtig: Vermerken Sie im Zahlungszweck der Überweisung Ihre E-Mail-Adresse an. Wir stellen Ihnen Ihre Böögg NFTs auf diese zeitnah zu.</p><br></br>
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
 
export default Success; 