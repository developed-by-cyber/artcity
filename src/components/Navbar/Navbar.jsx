import "./Navbar.css";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";
import { BubblyLink } from "react-bubbly-transitions";
import logo from "../../assets/logo-white.png"
function Navbar({ handleEx, handleWorks }) {
  // Navbar Animation
  const side = () => {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.add("activ");
  };
  const hide = () => {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.remove("activ");
  };
  return (
    <>
      {/* Mobile Nav */}
      <nav className="mobile-nav">
        <ul className="logo-hold">
          <li className="logo"><Link to="/"><img src={logo}  alt=""/></Link></li>
          <AiOutlineMenu className="toggle" onClick={side} color="white" />
        </ul>
        <div id="sideMenu" className="side-bar">
          <div className="closer">
            <li className="logo">
              <Link to="/"><img src={logo} alt=""/></Link>
            </li>
            <AiOutlineCloseCircle
              onClick={hide}
              className="close"
              color="white"
            />
          </div>
          <ul>
            <li onClick={handleEx}>
              <Link onClick={hide} >Explore</Link>
            </li>
            <li onClick={handleWorks}>
              <Link onClick={hide}>How it works</Link>
            </li>
            <li>
              <Link to="/Terms">Terms and conditions</Link>
            </li>
          </ul>
          <div className="btns">
            <BubblyLink  to="/Login">
              <button className="btn1">Sign-In</button>
            </BubblyLink>
            <BubblyLink to="/Register">
              <button className="btn2">Sign-Up</button>
            </BubblyLink>
          </div>
        </div>
      </nav>

      {/* main Nav */}
      <nav className="main-nav">
        <ul>
          <li data-aos="fade-down" data-aos-delay="300" className="logo">
            <Link to="/"><img src={logo} alt="" width={90}/></Link>
          </li>
          <li onClick={handleEx} data-aos="fade-down" data-aos-delay="400">
            <Link to="/">Explore</Link>
          </li>
          <li onClick={handleWorks} data-aos="fade-down" data-aos-delay="500">
            <Link to="/">How it works</Link>
          </li>
          <li data-aos="fade-down" data-aos-delay="600">
            <Link to="/Terms">Terms and conditions</Link>
          </li>
        </ul>
        <div className="btns">
          <BubblyLink to="/Login">
            <button data-aos="fade-down" data-aos-delay="700" className="btn1 btn-small">Sign-In</button>
          </BubblyLink>
          <BubblyLink to="/Register">
            <button data-aos="fade-down" data-aos-delay="800" className="btn2 btn-small">Sign-Up</button>
          </BubblyLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
