import "./Header.css";
import { Navbar, Slider } from "../../components";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderImg1 from "../../assets/Headerimg/Mask group.png";
import ellipse from "../../assets/Headerimg/Ellipse 486.png";
import star from "../../assets/Headerimg/Star 2.png";
import { Link } from "react-router-dom";
function Header({ handleEx, handleWorks }) {
  return (
    <>
      <div className="header">
        <div className="wrapper">
          <Navbar handleEx={handleEx} handleWorks={handleWorks} />
          <img
            data-aos="fade-right"
            data-aos-delay="800"
            className="ellipse"
            src={ellipse}
            alt="ellipse"
          />
          <div className="landing w-100  d-lg-flex justify-content-between">
            <div className="landing-left">
              <p data-aos="fade-down" data-aos-delay="500">
                Discover, Create & Sell your Artworks.
              </p>
              <p className="p-last" data-aos="fade-down" data-aos-delay="600">
                The world’s best and largest digital marketplace for crypto
                collectibles and non-fungible tokens (NFTs). Buy, sell, and
                discover exclusive digital items.
              </p>
              <Link to='/Dashboard'>
                <button data-aos="fade-down" data-aos-delay="700">
                  Discover Now
                </button>
              </Link>
            </div>
            <div
              className="landing-right"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <img className=" header-img" src={HeaderImg1} alt="HeaderImg1" />
            </div>
          </div>
        </div>
        <img
          data-aos="fade-left"
          data-aos-delay="800"
          className="star"
          src={star}
          alt="star"
        />
        <Slider />
      </div>
    </>
  );
}

export default Header;
