import React, { useState,useEffect } from "react";
import "./DashboardHome.css";
import bigWallet from "../../assets/DashboardImg/Eth (2).png";
import Ethr from "../../assets/DashboardImg/Eth (1).png";
import RecentTransaction from "../Dashboard/Transaction/RecentTransaction";
import Nfts from "./Transaction/Nfts";
import RecentSales from "../Dashboard/Transaction/RecentSales";
import Deposit from "./Modals/Deposit";
import Withdraw from "./Modals/Withdraw";
import { useAuth } from "../../providers/auth";
import { domain } from "../../config";
import Loader from "../../components/loader/Loader";
function DashboardHome({ Anmol }) {
  const user = localStorage.getItem('user')
  const userDetails = JSON.parse(user)
  const [details,setDetails] = useState(null)
  const [prices,setPrice] = useState({
    eth:0,
    weth:0
  })
  useEffect(()=>{
    fetch(`${domain}/api/v1/users/myDetails`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${userDetails.token}`
      }
    })
    .then(res=>res.json())
    .then(data=>{
      setDetails(data)
      convertEth(data.data.wallet.eth)
      convertWeth(data.data.wallet.weth)
    })
  },[])
  function convertEth(value){
   fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
   .then(res=>res.json())
   .then(data=>{
    setPrice(preValue=>{
      return{
        ...preValue,
        eth:data.USD * value
      }
    })
   })
  }
  function convertWeth(value){
    fetch('https://min-api.cryptocompare.com/data/price?fsym=WETH&tsyms=USD')
    .then(res=>res.json())
    .then(data=>{
     setPrice(preValue=>{
       return{
         ...preValue,
         weth:data.USD * value
       }
     })
    })
   }
  const [Mod, setMod] = useState(false);
  const [Mod2, setMod2] = useState(false);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  for (let i = 0; i < 1; i++) {
    if (Anmol === "section1") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (Anmol === "section2") {
      scrollToSection("section2");
    }
    if (Anmol === "section3") {
      scrollToSection("section3");
    }
    if (Anmol === "section4") {
      scrollToSection("section4");
    }
  }
  if(details === null){
    return(<><Loader/></>)
  }
  return (
    <div id="section1" className="DashboardHome">
      <div>
        <div className="row box-wrapper justify-content-center">
          <div className=" box">
            <img src={bigWallet} alt="wallet" />
            <div className="box-right">
              <span>Account Balance</span>
              <p>{(details.data.wallet.accountBallance).toFixed(3)} {details.data.wallet.currency}</p>
            </div>
          </div>
          <div className=" boxx">
            <img src={Ethr} alt="wallet" />
            <div className="box-right">
              <span>{details.data.wallet.currency} ({details.data.wallet.network})</span>
              <p>{(details.data.wallet.eth).toFixed(3)}</p>
              <span className="mini">-${(prices.eth).toFixed(2)}</span>
            </div>
          </div>
          <div className=" boxx">
            <img src={Ethr} alt="wallet" />
            <div className="box-right">
              <span>WETH ({details.data.wallet.network})</span>
              <p>{(details.data.wallet.weth).toFixed(3)}</p>
              <span className="mini">-${(prices.weth).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="box-btn">
          <button className="btn1" onClick={() => setMod(true)}>
            Deposit
          </button>
          <button className="btn2" onClick={() => setMod2(true)}>
            Withdraw
          </button>
        </div>
        {Mod && <Deposit address={details.data.wallet.address} qrCode={details.data.wallet.qrCode} network={details.data.wallet.network} setMod={setMod} />}
        {Mod2 && <Withdraw setMod2={setMod2} wethBalance={details.data.wallet.weth} ethBalance={details.data.wallet.eth} token={userDetails.token} />}
      </div>
      <div id="section2" className="pt-2">
        <RecentTransaction transactions={details.data.wallet.transactions} currency={details.data.wallet.currency} />
      </div>

      <div id="section3" className="pt-2">
        <Nfts userNft={details.data.myNft}/>
      </div>
      <div id="section4" className="pt-2">
        <RecentSales user={details.data.username} sales={details.data.myNftTransaction}/>
      </div>
    </div>
  );
}

export default DashboardHome;
