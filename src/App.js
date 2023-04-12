import React from "react";
import './App.css';
import MailchimpSubscribe from "react-mailchimp-subscribe"

import { ethers } from 'ethers'
import { useState, useEffect } from 'react';

import boegimg from './assets/boeg_final.png'
import combineImg from './assets/combine.png'
import checkmark from './assets/checkmark.png'
import high_resolution from './assets/360.svg'
import authentic from './assets/authentic.svg'
import fast_transfer from './assets/fast-transfer.svg'
import historical from './assets/historical.svg'
import metaverse from './assets/metaverse.svg'
import transparency from './assets/transparency.svg'
import opensea from './assets/opensea.svg'
import link from './assets/external_link.svg'
import angle_down from './assets/angle-down.svg'
import lock from './assets/lock.svg'
import nft_faq from './assets/nft-faq.svg'
import shopping_bag from './assets/shopping-bag.svg'
import snowman from './assets/snowman.svg'
import eth from './assets/eth.svg'
import card from './assets/credit-card.svg'
import wallet from './assets/wallet-filled-money-tool.svg'
import logo from './assets/toleologo.png'

import { loadStripe } from "@stripe/stripe-js";

import {
  Contract,
  Abi,
  targetChain,
  hexchainId,
  testmode,
  stripeprod,
  stripetest,
  host,
  mumbaiRelay,
  ethRelay,
  mailchimp,
  ethprice,
  chfprice
} from './assets/config'


function App() {

  const EtherAddress = "https://etherscan.io/address/" + Contract
  const [walletAddress, setAddress] = useState([])
  //const [counter, setcounter] = useState([])
  const [priceETH, setpriceETH] = useState([])
  const [priceCHF, setpriceCHF] = useState([])
  const [topayCHF, settopayCHF] = useState([chfprice])
  const [topayETH, settopayETH] = useState([ethprice])
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenZunft, setIsOpenZunft] = useState(false);
  const [isOpenThank, setIsOpenThank] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [crypt, setcrypto] = useState([false])
  const [chf, setchf] = useState([false])
  const [answer, setAnswer] = useState(0)
  const faqArr= [
    {
      src:nft_faq,
      alt:"nft icon",
      text:"Was sind NFTs und wofür werden sie genutzt?",
      answer:"answer"
    },
    {
      src:shopping_bag,
      alt:"shopping_bag",
      text:"Wo und wie kann ich NFTs kaufen?",
      answer:"answer"
    },    {
      src:wallet,
      alt:"wallet",
      text:"Wie kann ich ein eigenes Wallet für den Kauf von Cryptowährungen und NFTs erstellen?",
      answer:"answer"
    },    {
      src:snowman,
      alt:"snowman",
      text:"Warum gibt es den Böögg NFT?",
      answer:"answer"
    },    {
      src:lock,
      alt:"lock",
      text:"Wie gehe ich sicher mit den digitalen Coins und Tokens in meinem Wallet um?",
      answer:"answer"
    },  ];

  // const SimpleForm = () => <MailchimpSubscribe url={mailchimp}/>

  useEffect(() => {
    // call api or anything

    connect()
  })

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    setError(null);

    if (isValidEmail(email)) {
      setSuccess('Sended!');
    } else {
      setError('Email is invalid');
    }
  };

  const toggling = () => setIsOpen(!isOpen);

  const togglingZunft = () => setIsOpenZunft(!isOpenZunft);

  const togglingModal = () => {
    setIsOpenModal(!isOpenModal)
    document.body.classList.toggle('overflow');
  };

  const togglingThank = () => {
    window.open("/successinvoice")
    /*
    setIsOpenThank(!isOpenThank)
    document.body.classList.toggle('overflow');
    */
  };

  var x = setInterval(function () {
    var countDownDate = new Date("May 1, 2023 18:00:00").getTime();
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Display the result in the element with id="demo"
    document.getElementById("days").innerHTML = days
    document.getElementById("hours").innerHTML = hours
    document.getElementById("minutes").innerHTML = minutes

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("openModalBtn").classList.add("hidden");
    }
  }, 10000);

  async function connect() {
    let pri = ethprice
    setpriceETH(pri)
    setpriceCHF(chfprice)

    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    )

    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });

    // check if on correct network
    let chainId = await provider.getNetwork();
    if (chainId.chainId != targetChain) {
      try {
        // call the switch
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: hexchainId }],
        });

      } catch (e) {

        console.log(e)
      }
    } else {
      // declare signer
      const signer = provider.getSigner()
      const nftContract = new ethers.Contract(Contract, Abi, signer)

      // ask for wallet connection
      await provider.send("eth_requestAccounts", [])
      let address = (await signer.getAddress()).toString()
      setAddress(address)
      setcrypto(true)

      //let ctn = await nftContract.counter()
      //setcounter(ctn.toString())
      //setpriceETH(ethers.utils.formatUnits(pri.toString().toString(), 'ether'));
      setcrypto(true)
      setchf(true)      

      let connectbtn = document.getElementById("connectBtn");
      //connectbtn.disabled = true;

      let addressToPrint = address.substr(0, 4) + "..." + address.substr(38, 42)
      connectbtn.innerHTML = addressToPrint

    }
  }

  async function buyEth() {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    )

    // declare signer
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(Contract, Abi, signer)

    let toMint = parseInt(document.getElementById("mintAmount").innerText)

    const price = await nftContract.price();
    const finalPay = ethers.BigNumber.from((Number(price) * toMint).toString())
    let address = (await signer.getAddress()).toString()

    try {
      const transaction = await nftContract.mint(address, toMint, {
        value: finalPay
      })
      document.getElementById("payCrypto").innerText = "Pending..."
      await transaction.wait()
      window.location.href = "/success"
    } catch (e) {
      console.log(e)
      document.getElementById("mintError").innerHTML = "Transaktionsfehler!"
    }
  }

  async function buyChf() {

    if (ethers.utils.isAddress(walletAddress)) {
      let stripe

      if (testmode == 1) {
        stripe = await loadStripe(stripetest)
      } else {
        stripe = await loadStripe(stripeprod)
      }

      let amount = document.getElementById("mintAmount").innerText

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        host + "/checkout/" + walletAddress + "/" + amount,
        {
          method: "POST",
          headers: headers,
        }
      );

      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    }
  }

  function openModal() {
    document.getElementById("walleterror").classList.add("hidden")
    if (ethers.utils.isAddress(walletAddress)) {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      document.getElementById("main").classList.add("modalblur")
    } else {
      document.getElementById("walleterror").classList.remove("hidden")
    }


  }

  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.getElementById("main").classList.remove("modalblur")
  }

  function minusAmount() {
    var amount = parseInt(document.getElementById("mintAmount").innerText);
    amount = amount - 1;
    if (amount < 1) {
      amount = 1;
    }

    document.getElementById("mintAmount").innerText = amount;

    settopayETH(priceETH * amount)
    settopayCHF(priceCHF * amount)
  }

  function addAmount() {
    var amount = parseInt(document.getElementById("mintAmount").innerText);
    amount = amount + 1;
    if (amount > 10) {
      amount = 10;
    }

    document.getElementById("mintAmount").innerText = amount;
    console.log(priceETH)
    settopayETH(priceETH * amount)
    settopayCHF(priceCHF * amount)
  }

  function changepay() {
    let ele = document.getElementsByName("paymethod")
    let value
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        value = ele[i].value
        break;
      }
    }

    if (value == "crypto") {
      document.getElementById("payCrypto").classList.remove("hidden")
      document.getElementById("payCredit").classList.add("hidden")
      document.getElementById("invoiceex").classList.add("hidden")
      document.getElementById("payInvoice").classList.add("hidden")
    } else {
      if (value == "invoice") {
        document.getElementById("invoiceex").classList.remove("hidden")
        document.getElementById("payInvoice").classList.remove("hidden")
        document.getElementById("payCrypto").classList.add("hidden")
        document.getElementById("payCredit").classList.add("hidden")
      } else {
        document.getElementById("payCrypto").classList.add("hidden")
        document.getElementById("payCredit").classList.remove("hidden")
        document.getElementById("invoiceex").classList.add("hidden")
        document.getElementById("payInvoice").classList.add("hidden")
      }
    }
  }

  return (
    <div id="main" className="App text-white bg-black">
      <div className="grid grid-cols-2" id="header">
        <div className="flex justify-start">
          <img src={logo} className="logo" alt="main logo"></img>
        </div>
        <div className="flex justify-end items-center">
          <button className="hover:underline" id="connectBtn" onClick={connect}>Connect Wallet</button>
        </div>
      </div>
      <div className="flex items-start justify-between flex-col sm:flex-row" id="banner">
        <div className="md:mr-[25px] sm:max-w-[50%] lg:max-w-[638px] max-w-[100%]" id="headerimage">
          <div className="mx-auto" id="">
            <img src={combineImg} className="mx-auto boeg-image" alt="main nft"></img>
          </div>
        </div>
        <div className="md:mt-5" id="buysection">
          <h1 className="maintitle text-center md:text-right 2xl:text-[160px] lg:text-[100px] md:text-[50px] text-[30px]">Dä Böögg NFT isch da!</h1>
          <p className="lead text-center md:mr-0 mr-auto ml-auto tracking-[0.01em] mt-5 md:mt-[42px] text-lg md:text-2xl 2xl:text-[60px] 2xl:leading-[73px] max-w-[849px] md:text-right">Das digitale Sammlerstück zum Sächsilüüte 2023.</p>
          <div className="lg:mt-32 md:mt-16 mt-8">
            <div className="flex justify-center md:justify-end">
              <button className="float-right text-xl md:text-md lg:text-2xl 2xl:text-[46px] p-5 lg:p-8" id="openModalBtn" onClick={togglingModal}>Jetzt Kaufen</button><br></br>
            </div>
            <p className="hidden mt-4 mb-4 float-right text-right text-orange-600" id="walleterror">Es ist keine valide Ethereum Adresse verbunden!</p>
            <a href="" className="float-right text-base md:text-right text-center mt-6 text-2xl md:text-[20px] lg:text-[36px]" id="walletlink">&gt; Wie erstelle ich ein eigenes Crypto Wallet?</a>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col lg:flex-row justify-between" id="saleEnds">
        <div className="sale-timer">
          <h2 className="sale-ends-title lg:text-left">
            Verkauf endet für immer in
          </h2>
          <ul className="timer-list">
            <li className="timer-item">
              <p className="time" id="days">

              </p>
              <p className="period">
                Tagen
              </p>
            </li>
            <li className="timer-item">
              <p className="time" id="hours">

              </p>
              <p className="period">
                Stunden
              </p>
            </li>
            <li className="timer-item">
              <p className="time" id="minutes">

              </p>
              <p className="period">
                Minuten
              </p>
            </li>
          </ul>
        </div>
        <div className="sale-dropdown-wrapper justify-center lg:justify-end">
          <div className="flex">
            <img className="opensea" src={opensea} alt="opensea"></img>
            <div className="sale-details ml-5">
              <div className="dropdown-header" onClick={toggling}>
                <p className="dropdown-title">
                  NFT Details <img className="angle-icon" src={angle_down} alt="angle-down"></img>
                </p>
                {isOpen && (
                  <ul className="sale-details-list">
                    <li className="details-list-item">
                      <a href="#" className="outer-link">original media <img className="outer-link" src={link} alt="outer link"></img></a>
                      <p className="token">HTTP...FFJO</p>
                    </li>
                    <li className="details-list-item">
                      <a href="#" className="outer-link">redeem contract <img className="outer-link" src={link} alt="outer link"></img></a>
                      <p className="token">0XD62F...70aa</p>
                    </li>
                    <li className="details-list-item">
                      <p>
                        end date
                      </p>
                      <p>
                        never
                      </p>
                    </li>
                    <li className="details-list-item">
                      <p>
                        redeem token type
                      </p>
                      <p>
                        erc721
                      </p>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-0 md:mt-[162px] mt-[80px]" id="why">
        <h2 className="h2title">Warum Böögg NFT?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="col-item">
            <img className="icon" src={historical} alt="historical"></img>
            <h3 className="h3title">Historisches Sammlerstück</h3>
            <p className="cardtext">Mit dem Böögg NFT erhält das Sechseläuten 2023 erstmals ein digitales Sammlerstück. Der Böögg ist hierbei das zentrale Symbol mit dem wir Innovation und Tradition verbinden wollen.Ein Meilenstein in der Historie des Fests.</p>
          </div>
          <div className="col-item">
            <img className="icon" src={high_resolution} alt="high resolution"></img>
            <h3 className="h3title">Der Böögg in hochauflösendem 3D</h3>
            <p className="cardtext">Mit dem NFT erhalten sie die 3D Datei zum Böögg Model - gespeichert auf Lebzeiten. Entdecken Sie alle Facetten des 2023 Bööggs in 360° am Desktop oder drucken Sie ihre eigenen Böögg Figuren mit gängigen 3D-Druckern.</p>
          </div>
          <div className="col-item">
            <img className="icon" src={metaverse} alt="metaverse"></img>
            <h3 className="h3title">Bereit für das Metaverse</h3>
            <div>
              <p className="cardtext">Der Böögg NFT ist Metaverse kompatibel. Setzen Sie ihre neue Böögg Skulptur in allen gängigen 3D-Metaversen in Szene.</p>
              <p className="cardtext">Wir helfen Ihnen gerne bei weiteren Fragen dazu.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="" id="what">
        <h2 className="text-2xl lg:text-3xl 2xl:text-4xl h2title">Was sind NFTs?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="col-item">
            <img className="icon" src={transparency} alt="transparency"></img>
            <h3 className="h3title">Transparenter Besitz</h3>
            <p className="cardtext">Das Wallet des aktuellen Besitzers eines NFTs, sowie eine Historie vorheriger Besitzerwallets sind über die Blockchain jederzeit transparent einsehbar. Dadurch lässt sich Besitz jederzeit und überall leicht nachweisen.</p>
          </div>
          <div className="col-item">
            <img className="icon" src={authentic} alt="authentic"></img>
            <h3 className="h3title">Verifizierbar & Authentisch</h3>
            <p className="cardtext">Neben der Besitzhistorie eines NFTs kann zudem auch das Wallet des Herausgebers eingesehen werden. Dadurch lassen sich NFTs von Kopien unterscheiden was es leicht macht Originale zu verifizieren.</p>
          </div>
          <div className="col-item">
            <img className="icon" src={fast_transfer} alt="fast_transfer"></img>
            <h3 className="h3title">Blitzschneller Transfer</h3>
            <p className="cardtext">NFTs sind digitale Güter, die sowohl digitale als auch physische Besitztümer, Mitgliedschaften oder Ansprüche repräsentieren. Über die Blockchain können NFTs in Sekunden transferiert werden, was liquiden Handel ermöglicht.</p>
          </div>
        </div>
      </div>

      <div className="md:mt-[11rem] mt-16  " id="newsletter">
        <h2 className="h31title">Keine Neuigkeiten mehr verpassen!</h2>
        <h2 className="h31title">Der Toleo Newsletter!</h2>
        <form className="conact-form" onSubmit={handleSubmit}>
          <input id="first_name" name="first_name" type="text" placeholder="Vorname" />
          <input id="last_name" name="last_name" type="text" placeholder="Nachname" />
          <input
            placeholder="john@example.com"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <div className="form-dropdown-wrapper">
            <div className="dropdown-header" onClick={togglingZunft}>
              <p className="dropdown-title">
                Zunft <img className="angle-icon" src={angle_down} alt="angle-down"></img>
              </p>
            </div>
            {isOpenZunft && (
              <ul className="sale-details-list">
                <li className="details-list-item checked">
                  <input name="zunft" id="keine" type="radio" />
                  <label for="kine">
                    Keine Zunftzugehörigkeit
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="st_niklaus" type="radio" />
                  <label for="st_niklaus">
                    St. Niklaus
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="gerwe" type="radio" />
                  <label for="gerwe">
                    Gerwe & Schuhmacher
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="constaffel" type="radio" />
                  <label for="zunft3">
                    Gesellschaft zur Constaffel
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="saffran" type="radio" />
                  <label for="zunft4">
                    Saffran
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="meisen" type="radio" />
                  <label for="zunft4">
                    Meisen
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="schmiden" type="radio" />
                  <label for="zunft4">
                    Schmiden
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="weggen" type="radio" />
                  <label for="zunft4">
                    Weggen
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="widder" type="radio" />
                  <label for="zunft4">
                    Widder
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="zimmerleuten" type="radio" />
                  <label for="zunft4">
                    Zimmerleuten
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="schneidern" type="radio" />
                  <label for="zunft4">
                    Schneidern
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="schiffleuten" type="radio" />
                  <label for="zunft4">
                    Schiffleuten
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="kambel" type="radio" />
                  <label for="zunft4">
                    Kämbel
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="waag" type="radio" />
                  <label for="zunft4">
                    Waag
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="Stadtzunft" type="radio" />
                  <label for="zunft4">
                    Stadtzunft
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="riesbach" type="radio" />
                  <label for="zunft4">
                    Riesbach
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="fluntern" type="radio" />
                  <label for="zunft4">
                    Fluntern
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="dreikoenige" type="radio" />
                  <label for="zunft4">
                    Drei Könige
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="hottingen" type="radio" />
                  <label for="zunft4">
                    Hottingen
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="wiedikon" type="radio" />
                  <label for="zunft4">
                    Wiedikon
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="wollishofen" type="radio" />
                  <label for="zunft4">
                    Wollishofen
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="hard" type="radio" />
                  <label for="zunft4">
                    Hard
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="oberstrass" type="radio" />
                  <label for="zunft4">
                    Oberstrass
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="hoengg" type="radio" />
                  <label for="zunft4">
                    Höngg
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="Letzi" type="radio" />
                  <label for="zunft4">
                    Letzi
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="schwamendingen" type="radio" />
                  <label for="zunft4">
                    Schwamendingen
                  </label>
                </li>
                <li className="details-list-item">
                  <input name="zunft" id="witikon" type="radio" />
                  <label for="zunft4">
                    Witikon
                  </label>
                </li>
              </ul>
            )}
          </div>
          <button type="submit">Submit</button>
          {error && <h2 style={{ color: 'red' }}>{error}</h2>}
          {success && <h2 style={{ color: '#919191' }}>{success}</h2>}
        </form>
      </div>
      <div className="mt-36" id="faq">
        <h2 className="text-2xl lg:text-3xl 2xl:text-4xl h2title">FAQ</h2>
        <ul className="faq-list">
          {faqArr.map((ele,index)=>{
            return (
            <li className="faq-item" onClick={()=>{setAnswer(index)}}>
              <a>
                <img src={ele.src} alt={ele.alt}></img>
                <p className="faq-text">{ele.text}</p>
              </a>
              <p className={(answer===index?"":"hide-answer")+" mb-5"}>{ele.answer}</p>
            </li>
            )

          })}
        </ul>
      </div>
      <div className="md:mt-36 mt-12 flex justify-center flex-col md:flex-row md:gap-20 gap-5 text-xl" id="footer">
        <p className="">AGB</p>
        <a href="/impressum"><p className="">Impressum</p></a>
        <a href="mailto:team@toleo.ch"><p className="">team@toleo.ch</p></a>
      </div>
      {isOpenModal && (
        <div className="modal bg-black px-[45px] py-[37px]" id="myModal">
          <div className="grid grid-cols-2 mb-7">
            <h2 className="modaltitle text-left">Checkout</h2>
            <span onClick={togglingModal} className="close text-right">&times;</span>
          </div>
          <div className="flex items-end justify-start gap-5">
            <img src={boegimg} className="p-1 border-solid border-2 border-white rounded-[30px] col-span-1 max-w-[120px]"></img>
            <div className="col-span-4 w-full text-left mt-[55px]">
              <h3 className="minortitle">Böögg NFT #103</h3>
              <p className="">Sächsilüüte 2023</p>
              <div className="mint-box mt-[48px]">
                <p className="mint-box-title">
                  Anzahl:
                </p>
                <div className="quantity-box w-full flex items-center justify-end gap-1.5 text-center w-1/2">
                  <button onClick={minusAmount} className="text-2xl">-</button>
                  <span id="mintAmount" className="text-2xl border-solid border-2 rounded-[45px] px-4">1</span>
                  <button onClick={addAmount} className="text-2xl">+</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-2 text-left">
              <h3 className="minortitle">Gesamtpreis</h3>
              <div className="flex flex-col items-end justify-center">
                <p className="text-2xl font-bold"><span id="ethpice" className="ml-8">{topayETH}</span> ETH</p>
                <h3 className="text-2xl"><span id="chfprice" className="ml-8">{topayCHF}</span> CHF</h3>
              </div>
            </div>
            <p className="text-left text-3xl my-4 payment-title">Zahlungsart</p>
            <div className="text-left">
              {
                crypt == true && 
                <div className="mb-4" id="mainradio">
                <input type="radio" id="html" name="paymethod" value="crypto" onClick={changepay}></input>
                <label className="text-[26px]" for="html"> <img src={eth} alt="eth" /> Crypto (Ethereum)</label>
                </div>
              }
              {
                chf == true &&
                <div className="mb-4" id="mainradio">
                <input type="radio" id="css" name="paymethod" value="credit" onClick={changepay}></input>
                <label className="text-[26px]" for="css"> <img src={card} alt="card" /> Kredit- oder Debitkarte</label>
                </div>
              }

              <div className="mb-4" id="mainradio">
                <input type="radio" id="css" name="paymethod" value="invoice" onClick={changepay}></input>
                <label className="text-[26px]" for="css"> <img src={card} alt="card" /> Rechung</label>
              </div>
              <p className="hidden" id="mainerror">Aktuell sind keine Krediktarenzahlungen möglich.</p>
              <div className="hidden" id="invoiceex">
                <p>Bitte überweisen Sie den oben genannten Betrag an folgende Bankverbindung:</p><br></br>

                <p>CH53 0844 0257 2399 8200 1</p><br></br>

                <p>Alea AG</p>
                <p>Schaffhauserstrasse 188</p>
                <p>8057 Zürich</p>
                <br></br>
                <p>Wichtig: Vermerken Sie im Zahlungszweck der Überweisung Ihre E-Mail-Adresse an. Wir stellen Ihnen Ihre Böögg NFTs auf diese zeitnah zu.</p><br></br>
              </div>
            </div>
            {/*
            <div className="">
              <div className="mb-4" id="mainradio">
                <input type="checkbox" id="agb" name="access" value="agb"></input>
                <label className="text-[20px]" for="agb"> Ich habe die <a href="#" className="text-[#1B40FF]">AGB</a> gelesen und stimme zu.</label>
              </div>
              <div className="mb-4" id="mainradio">
                <input type="checkbox" id="privacy" name="access" value="privacy"></input>
                <label className="text-[20px]" for="privacy"> Ich habe die <a href="#" className="text-[#1B40FF]">Datenschutzerklärung</a> gelesen.</label>
              </div>
            </div>
            */}
            <div className="h-full">
              <button onClick={buyEth} id="payCrypto" className="w-full bg-[#183ADF] rounded-[30px] flex items-center justify-center text-3xl font-bold p-6 hidden">Zahle {topayETH} ETH via Wallet</button>
              <button onClick={buyChf} id="payCredit" className="w-full bg-[#183ADF] rounded-[30px] flex items-center justify-center text-3xl font-bold p-6 hidden">Zahle {topayCHF} CHF via Stripe.com</button>
              <button id="payInvoice" className="hidden w-full bg-[#183ADF] rounded-[30px] flex items-center justify-center text-3xl font-bold p-6" onClick={togglingThank}>
                Kauf per Rechnung
              </button>
              <p className="hidden" id="mintError"></p>
            </div>
          </div>

        </div>
      )}
      {isOpenThank && (
        <div className="thank-wrapper" id="thank">
          <div className="grid grid-cols-2" id="header">
            <div className="" id="">
              <img src={logo} className="logo" alt="main logo"></img>
            </div>
            <div className="" id="">
              <button className="hover:underline" id="connectBtn">0xFB23ak4Kld...</button>
            </div>
          </div>
          <div className="thank-info">
            <img src={boegimg} className="mx-auto boeg-image" alt="main nft"></img>
            <div className="info-content">
              <img src={checkmark} className="mx-auto checkmark" alt="checkmark"></img>
              <h2 className="thank-title">
                Vielen Dank!
              </h2>
              <p className="thank-nft-name">
                NFT Kauf erfolgreich. Du besitzt nun Böögg #103!
              </p>
              <a href="#" className="nft-open-link">
                <img className="opensea" src={opensea} alt="opensea" /> <p>Jetzt Böögg #103 auf OpenSea ansehen</p>
              </a>
            </div>
          </div>
          <div className="sale-details">
            <div className="dropdown-header" onClick={toggling}>
              <p className="dropdown-title">
                NFT Details <img className="angle-icon" src={angle_down} alt="angle-down"></img>
              </p>
              {isOpen && (
                <ul className="sale-details-list">
                  <li className="details-list-item">
                    <a href="#" className="outer-link">original media <img className="outer-link" src={link} alt="outer link"></img></a>
                    <p className="token">HTTP...FFJO</p>
                  </li>
                  <li className="details-list-item">
                    <a href="#" className="outer-link">redeem contract <img className="outer-link" src={link} alt="outer link"></img></a>
                    <p className="token">0XD62F...70aa</p>
                  </li>
                  <li className="details-list-item">
                    <p>
                      end date
                    </p>
                    <p>
                      never
                    </p>
                  </li>
                  <li className="details-list-item">
                    <p>
                      redeem token type
                    </p>
                    <p>
                      erc721
                    </p>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="mt-36" id="newsletter">
            <h2 className="text-xl lg:text-2xl 2xl:text-3xl h31title">Jetzt als Böögg Eigentümer verewigen!</h2>
            <p className="">Als Erstbesitzer eines Böögg NFTs erwarten Sie spannende Vorteile & Neuigkeiten</p>
            <form className="conact-form" onSubmit={handleSubmit}>
              <input id="first_name" name="first_name" type="text" placeholder="Vorname" />
              <input id="last_name" name="last_name" type="text" placeholder="Nachname" />
              <input
                placeholder="john@example.com"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
              />
              <div className="form-dropdown-wrapper">
                <div className="dropdown-header" onClick={togglingZunft}>
                  <p className="dropdown-title">
                    Zunft <img className="angle-icon" src={angle_down} alt="angle-down"></img>
                  </p>
                </div>
                {isOpenZunft && (
                  <ul className="sale-details-list">
                    <li className="details-list-item checked">
                      <input name="zunft" id="keine" type="radio" />
                      <label for="kine">
                        Keine Zunftzugehörigkeit
                      </label>
                    </li>
                    <li className="details-list-item">
                      <input name="zunft" id="st_niklaus" type="radio" />
                      <label for="st_niklaus">
                        Zunft St. Niklaus
                      </label>
                    </li>
                    <li className="details-list-item">
                      <input name="zunft" id="gerwe" type="radio" />
                      <label for="gerwe">
                        Zunft Gerwe & Schuhmacher
                      </label>
                    </li>
                    <li className="details-list-item">
                      <input name="zunft" id="zunft3" type="radio" />
                      <label for="zunft3">
                        Zunft 3
                      </label>
                    </li>
                    <li className="details-list-item">
                      <input name="zunft" id="zunft4" type="radio" />
                      <label for="zunft4">
                        Zunft 4
                      </label>
                    </li>
                  </ul>
                )}
              </div>
              <button type="submit">Submit</button>
              {error && <h2 style={{ color: 'red' }}>{error}</h2>}
              {success && <h2 style={{ color: '#919191' }}>{success}</h2>}
            </form>
          </div>
        </div>

      )}
    </div>
  );
}
export default App; 