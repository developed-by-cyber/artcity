import "./Widthdraw.css";
import Close from "../../../assets/close.png";
import star from "../../../assets/Star 3.png";
import {useState} from 'react'
import Swal from "sweetalert2";
import { domain } from "../../../config";

function Withdraw({ setMod2,wethBalance,ethBalance,token }) {
  const [Loading, setLoading] = useState(false);
  const [input,setInput] = useState({
    amount:0,
    address:''
  })
  function handleInput(e){
 const {name,value} = e.target
 setInput(preValue=>{
  return {
    ...preValue,
    [name]:value
  }
 })
  }
  function handleSubmit(e){
  e.preventDefault()
  setLoading(true);
  if(input.amount < 0.002){
    setMod2(false)
    return Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Minimum withdrawal at 0.002 ETH',
    })
  }else if(!input.address.includes('0x')){
    setMod2(false)
    return Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Please enter a valid ethereum address',
    })
  }else{
    fetch(`${domain}/api/v1/wallets/withdrawWeth/${input.amount}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
    .then(res=>res.json())
    .then(data=>{
      setLoading(false);
      setMod2(false)
      Swal.fire(data.status==="error"?'Opps!':'Great!',data.message,data.status)
    })
  }
  }
  return (
    <>
      <div className="modal-wrapper">
        <div className="mod">
          <div className="top">
            <div className="left">
              <p>Withdraw</p>
              <span>
                <img src={star} alt="star" />
                Label required field
              </span>
            </div>
            <img onClick={() => setMod2(false)} src={Close} alt="close" />
          </div>
          <div className="wallet">
            <div className="left">
              <p>
                <span>WETH bal:</span>{wethBalance.toFixed(3)} WETH
              </p>
            </div>
            <div className="right">
              <p>
                <span>ETH bal:</span>{ethBalance.toFixed(3)}  ETH
              </p>
            </div>
          </div>

          <form>
            <label>
              <img src={star} alt="star" /> Select a coin
            </label>
            <select className="sel">
              <option>WETH (ERC20)</option>
            </select>

            <label>
              <img src={star} alt="star" />
              Address
            </label>
            <input onChange={handleInput} name="address" pattern="^0x[a-fA-f0-9]{40}$" title="Enter a valid Ethereum address" value={input.address} type="text" placeholder="Enter your address" required/>

            <label>
              <img src={star} alt="star" />
              Amount
            </label>
            <input onChange={handleInput} type="number" name="amount" value={input.amount} step={0.002} min={0.002} placeholder="Enter your amount" required/>
            <button onClick={handleSubmit} type="submit" disabled={Loading}>
            {!Loading ? 
                  "Submit"
                :
                  <div className="p">
                    <span className="loader"></span>
                    <span className="pppp"> Submiting...</span>
                  </div>
                }
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Withdraw;
