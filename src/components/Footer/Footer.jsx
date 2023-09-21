import { Link } from "react-router-dom";
import "./Footer.css";
function Footer() {
  return (
    <>
      <footer>
        <div className="links">
          <div className="logo" data-aos="fade-down" data-aos-delay="500">
            <h1>Logo</h1>
            <p>
              The world’s best and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell, and
              discover exclusive digital items.
            </p>
          </div>

          <div className="link-hold" data-aos="fade-up" data-aos-delay="600">
            <div className="link">
              <p>Market Place</p>
              <ul>
                <li>
                  <Link to="/Marketplace">All NFTs</Link>
                </li>
                <li>
                  <Link to="/Marketplace">Art</Link>
                </li>
                <li>
                  <Link to="/Marketplace">Gaming</Link>
                </li>
                <li>
                  <Link to="/Marketplace">Photography</Link>
                </li>
                <li>
                  <Link to="/Marketplace">Membership</Link>
                </li>
                <li>
                  <Link to="/Marketplace">PFPs</Link>
                </li>
              </ul>
            </div>
            <div className="link">
              <p>My Account</p>
              <ul>
                <li>
                  <Link to="/Dashboard/NftProfile">Profile</Link>
                </li>
                <li>
                  <a href="/Dashboard">Collection</a>
                </li>
              </ul>
            </div>
            <div className="link link3">
              <ul>
                <li>
                  <Link to="/Terms">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/Terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <hr />
      <div className="copyright">
        <p>© 2018 - 2023 Artcity, Inc. All right reserved</p>
        <p className="p2">
          <Link to="/Terms">Privacy Policy</Link> <span>|</span>{" "}
          <Link to="/Terms">Terms of Service</Link>
        </p>
      </div>
    </>
  );
}

export default Footer;
