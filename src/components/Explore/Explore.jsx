import "./Explore.css";
import IMG from "../../assets/collection-image/image.png";
import { Link } from "react-router-dom";
function Explore({ exploreRef }) {
  return (
    <>
   <div className="ex-hold">
   <div ref={exploreRef} className="ex"></div>
   </div>
      <div className="explore">
        <div className="left" data-aos="fade-right" data-aos-delay="500">
          <img src={IMG} alt="img" />
        </div>
        <div className="right" data-aos="fade-left" data-aos-delay="600">
          <p className="first-p">Explore & Sell your Awesome NFTs Art</p>
          <p className="second-p">
            The world’s best and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>
          <div className="btns">
            <Link to="/Dashboard"><button className="btn1">Discover Now</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
