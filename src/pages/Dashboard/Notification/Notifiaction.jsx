import "./Notification.css";
import profImg from "../../../assets/DashboardImg/profileImg.png";
import verified from "../../../assets/DashboardImg/Verified.png";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Img9 from "../../../assets/DashboardImg/logout.png";
import { domain } from "../../../config";
import { useAuth } from "../../../providers/auth";
const Notifiaction = () => {
  const user = localStorage.getItem('user')
  const userDetails = JSON.parse(user)
  const [details,setDetails] = useState(null)
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
    })
  },[])
  if(details === null){
    return(<></>)
  }

  return (
    <>
      <div className="notification">
        <div className="prof">
          <Link to="/Dashboard">
            <img crossOrigin="anonymous" src={domain + details.data.photo} alt="profileImg" />
          </Link>
        </div>
        <Link to="/Dashboard">
        <div className="prof-name">
          <p>
            {details.data.username.length>8?(details.data.username).slice(0,8)+"...":details.data.username} <i className="hr"></i>
            {details.data.userVerified?<span>
              Verified <img src={verified} alt="verified" />
            </span>:null}
          </p>
        </div>
        </Link>
      </div>
    </>
  );
};

export default Notifiaction;
