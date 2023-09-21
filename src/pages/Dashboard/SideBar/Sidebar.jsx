import "./Sidebar.css";
import { Link } from "react-router-dom";
import { BubblyLink } from "react-bubbly-transitions";
import chevron from "../../../assets/chevron.png";
import { useState,useEffect } from "react";
import Img1 from "../../../assets/DashboardImg/wallet.png";
import Img2 from "../../../assets/DashboardImg/photo.png";
import Img3 from "../../../assets/DashboardImg/Union (1).png";
import Img4 from "../../../assets/DashboardImg/Transcation.png";
import Img5 from "../../../assets/DashboardImg/Vector.png";
import Img6 from "../../../assets/DashboardImg/Market.png";
import Img7 from "../../../assets/DashboardImg/profile.png";
import Img8 from "../../../assets/DashboardImg/Setting.png";
import Img9 from "../../../assets/DashboardImg/logout.png";
import logoWhite from "../../../assets/artcity-logo-white.png"
import icon from  "../../../assets/icon.png"
import Mint from "../Modals/Mint";
import { useAuth } from "../../../providers/auth";
import { useNavigate } from "react-router-dom";
import { domain } from "../../../config";
const Sidebar = ({ onDataUpdate }) => {
  const auth = useAuth()
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
  const navigator = useNavigate()
  const [isOpen, setisOpen] = useState(false);
  const hideSide = () => {
    setisOpen(!isOpen);
    const tog = document.getElementById("tog");
    tog.classList.toggle("aa");
  };
  const [Mod, setMod] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const TargetSection = (event) => {
    onDataUpdate(event);
    setActiveId(event);
  };
function handleLogout(e){
  e.preventDefault()
  auth.logout()
  navigator('/login')
}
  return (
    <>
      <div className="mobile-sidebar">
        <ul>
          <Link to='/Dashboard' className="link">
            <img src={Img1} alt="account" />
            <span>Account Sum</span>
          </Link>
          <Link onClick={() => setMod(true)} className="link">
            <img src={Img3} alt="account" />
            <span>Mint</span>
          </Link>
          <Link to="/MarketPlace" className="link">
            <img src={Img6} alt="account" />
            <span>Market place</span>
          </Link>
          <Link to="NftProfile" className="link">
            <img style={{ width: "12px" }} src={Img7} alt="account" />
            <span>Profile</span>
          </Link>
          <Link to="Settings" className="link">
            <img src={Img8} alt="account" />
            <span>Settings</span>
          </Link>
        </ul>
      </div>
      <div className="sidebar" style={{ width: isOpen ? "55px" : "232px" }}>
        <div className="sidebar-top">
          <p
            style={{
              fontSize: isOpen ? "13px" : "16px",
              display: isOpen ? "none" : "block",
            }}
            className="logo"
          >
            <Link to="/"><img src={logoWhite} alt="logo" width={220} /></Link>
          </p>
          <p
            style={{
              fontSize: isOpen ? "13px" : "16px",
              display: isOpen ? "block" : "none",
            }}
            
          >
            <Link to="/"><img src={icon} alt="logo" style={{position:"fixed",top:50,left:0}} /></Link>
          </p>
          <img
            id="tog"
            onClick={hideSide}
            className="chev"
            src={chevron}
            alt="chevron"
          />
        </div>
        <div className="sidebar-bottom">
          <ul className="sidebar-list">
            <Link
              onClick={(e) => TargetSection("section1")}
              to="/Dashboard"
              className={`sidebar-link ${
                activeId === "section1" || activeId === null
                  ? "active"
                  : "inactive"
              }`}
            >
              <li className="link">
                <img src={Img1} alt="account" />
                <span>Account Sum</span>
              </li>
            </Link>
            <li
              onClick={(e) => TargetSection("section3")}
              className={`sidebar-link ${
                activeId === "section3" ? "active" : "inactive"
              }`}
            >
              <Link to="/Dashboard" className="link">
                <img src={Img2} alt="account" />
                <span>NFT Collection</span>
              </Link>
            </li>
            <Link className="sidebar-link" onClick={() => setMod(true)}>
              <li className="link">
                <img src={Img3} alt="account" />
                <span>Mint</span>
              </li>
            </Link>
            <li
              onClick={(e) => TargetSection("section2")}
              className={`sidebar-link ${
                activeId === "section2" ? "active" : "inactive"
              }`}
            >
              <Link to="/Dashboard" className="link">
                <img src={Img4} alt="account" />
                <span>Transaction</span>
              </Link>
            </li>
            <li
              onClick={(e) => TargetSection("section4")}
              className={`sidebar-link ${
                activeId === "section4" ? "active" : "inactive"
              }`}
            >
              <Link to="/Dashboard" className="link">
                <img src={Img5} alt="account" />
                <span>Sales</span>
              </Link>
            </li>
            <li className="sidebar-link">
              <BubblyLink to="/MarketPlace" className="link">
                <img src={Img6} alt="account" />
                <span className="market">Market Place</span>
              </BubblyLink>
            </li>
            <Link
              onClick={(e) => TargetSection("section5")}
              to="NftProfile"
              className={`sidebar-link ${
                activeId === "section5" ? "active" : "inactive"
              }`}
            >
              <li className="link">
                <img src={Img7} alt="account" />
                <span id="Profile">My NFT Profile</span>
              </li>
            </Link>
            <Link
              onClick={(e) => TargetSection("section6")}
              to="Settings"
              className={`sidebar-link ${
                activeId === "section6" ? "active" : "inactive"
              }`}
            >
              <li className="link">
                <img src={Img8} alt="account" />
                <span id="setting">Settings</span>
              </li>
            </Link>
          </ul>
          <Link onClick={handleLogout} to="#" className="logout">
            <img src={Img9} alt="account" />
            <span style={{ opacity: isOpen ? "0" : "1" }}>Log out</span>
          </Link>
        </div>
      </div>
      {Mod && <Mint setMod={setMod} />}
    </>
  );
};

export default Sidebar;
