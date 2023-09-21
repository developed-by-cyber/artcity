import "./MarketPlace.css";
import color from "../../assets/DashboardImg/MarketPlace.png";
import { useState, useEffect } from "react";
import { NFTData } from "../../assets/Data/Data";
import { Link } from "react-router-dom";
import Notifiaction from "./Notification/Notifiaction";
import Loader from "../../components/loader/Loader";
import { domain } from "../../config";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import icon from "../../assets/fluent-mdl2_navigate-back.png";
import Support from "./Support/Support";
import HeroLoader from "../../components/loader/heroloader";

function MarketPlace() {
  const [DATA, setDATA] = useState(NFTData);
  const [toggle, setToggle] = useState(1);
  const [marketPlace, setMarketPlace] = useState(null);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const text =
  "Discover a dynamic online marketplace where creators and collectors unite to purchase, sell, and exchange one-of-a-kind NFTs. Uncover an extensive array of digital possessions, such as artwork, collectibles, music, videos, and beyond, all verified on the blockchain to establish ownership and rarity.";
  useEffect(() => {
    fetch(`${domain}/api/v1/nft?nftInMarket=true&sort=-priceInEtherium`)
      .then((res) => res.json())
      .then((data) => {
        setMarketPlace(data);
        setTotal(data.results);
      });
  }, []);

  function togged(index) {
    setToggle(index);
  }
  function fetchAll() {
    fetch(`${domain}/api/v1/nft?nftInMarket=true&sort=-priceInEtherium`)
      .then((res) => res.json())
      .then((data) => setMarketPlace(data));
  }
  function handleCatergory(categories) {
    fetch(
      `${domain}/api/v1/nft?nftInMarket=true&sort=-priceInEtherium&category=${categories}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMarketPlace(data);
      });
  }
  if (total === 0) {
    return <Loader />;
  }
  if(marketPlace === null){
    return(
      <>
      <div className="marketplace">
        <Support />
        <Link to="/Dashboard"><img className="bac-ar" src={icon} alt="icon" /></Link>
        <Notifiaction />
        <div className="desktop">
          <div className="top">
            <img src={color} alt="color" />
            <p className="p1">
              Discover a dynamic online marketplace where creators and
              collectors unite to purchase, sell, and exchange one-of-a-kind
              NFTs. Uncover an extensive array of digital possessions, such as
              artwork, collectibles, music, videos, and beyond, all verified on
              the blockchain to establish ownership and rarity.
            </p>
          </div>
          <div className="top2">
            <div className="item">
              <p>Marketplace</p>
              <span>
                <i>Items:</i> {total}
              </span>
              <span>
                <i className="span">Chains:</i> Ethereum
              </span>
            </div>
            <div className="item2">
              <p>{total*20} ETH</p>
              <span>Total volume</span>
            </div>
            <div className="item3">
              <p>{total*10} ETH</p>
              <span>listed</span>
            </div>
            <div className="item4">
              <p>{Math.round(total/2)} ETH</p>
              <span>Owners</span>
            </div>
          </div>
        </div>

        <div className="mobil">
          <div className="top">
            <div className="img-holder"></div>
          </div>
          <div className="top2">
            <div className="item">
              <p>Marketplace</p>
              <span>
                <i>Items:</i> {total}
              </span>
              <span>
                <i className="span">Chains:</i> Ethereum
              </span>
            </div>
          </div>
          <div className="see-more">
            <p className="p1 mt-4">
              {show ? text : `${text.substring(0, 185)}`}
            </p>
            <button onClick={() => setShow(!show)}>
              <BiChevronUp
                className="chev"
                style={{ rotate: !show ? "180deg" : "0deg" }}
                color="white"
                size={"20px"}
              />
              <span>
                {!show ? "see more" : "see less"}
              </span>
            </button>
          </div>

          <div className="top3 d-flex justify-content-between align-items-center">
            <div className="item">
              <p>{total*20} ETH</p>
              <span>Total volume</span>
            </div>
            <hr />
            <div className="item">
              <p>{total*10} ETH</p>
              <span>listed</span>
            </div>

            <hr />
            <div className="item">
              <p>{Math.round(total/2)} ETH</p>
              <span>Owners</span>
            </div>
          </div>
        </div>
        <div className="topp">
          <button
            onClick={() => {
              setMarketPlace(null)
              fetchAll();
              togged(1);
            }}
            className={toggle === 1 ? "active" : "btn-small"}
          >
            All
          </button>
          <button
            id="but1"
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("arts");
              togged(2);
            }}
            className={toggle === 2 ? "active" : "btn-small"}
          >
            Art
          </button>
          <button
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("gaming");
              togged(3);
            }}
            className={toggle === 3 ? "active" : "btn-small"}
          >
            Gaming
          </button>
          <button
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("pfps");
              togged(4);
            }}
            className={toggle === 4 ? "active" : "btn-small"}
          >
            PFPs
          </button>
          <button
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("photography");
              togged(5);
            }}
            className={toggle === 5 ? "active" : "btn-small"}
          >
            Photography
          </button>
          <button
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("membership");
              togged(6);
            }}
            className={toggle === 6 ? "active" : "btn-small"}
          >
            Membership
          </button>
        </div>

        <div>
       <HeroLoader/>
        </div>
      </div>
    </>
    )
  }
  return (
    <>
      <div className="marketplace">
        <Support />
        <Link to="/Dashboard"><img className="bac-ar" src={icon} alt="icon" /></Link>
        <Notifiaction />
        <div className="desktop">
          <div className="top">
            <img src={color} alt="color" />
            <p className="p1">
              Discover a dynamic online marketplace where creators and
              collectors unite to purchase, sell, and exchange one-of-a-kind
              NFTs. Uncover an extensive array of digital possessions, such as
              artwork, collectibles, music, videos, and beyond, all verified on
              the blockchain to establish ownership and rarity.
            </p>
          </div>
          <div className="top2">
            <div className="item">
              <p>Marketplace</p>
              <span>
                <i>Items:</i> {total}
              </span>
              <span>
                <i className="span">Chains:</i> Ethereum
              </span>
            </div>
            <div className="item2">
              <p>{total*20} ETH</p>
              <span>Total volume</span>
            </div>
            <div className="item3">
              <p>{total*10} ETH</p>
              <span>listed</span>
            </div>
            <div className="item4">
              <p>{Math.round(total/2)} ETH</p>
              <span>Owners</span>
            </div>
          </div>
        </div>

        <div className="mobil">
          <div className="top">
            <div className="img-holder"></div>
          </div>
          <div className="top2">
            <div className="item">
              <p>Marketplace</p>
              <span>
                <i>Items:</i> {total}
              </span>
              <span>
                <i className="span">Chains:</i> Ethereum
              </span>
            </div>
          </div>
          <div className="see-more">
            <p className="p1 mt-4">
              {show ? text : `${text.substring(0, 185)}`}
            </p>
            <button onClick={() => setShow(!show)}>
              <BiChevronUp
                className="chev"
                style={{ rotate: !show ? "180deg" : "0deg" }}
                color="white"
                size={"20px"}
              />
              <span>
                {!show ? "see more" : "see less"}
              </span>
            </button>
          </div>

          <div className="top3 d-flex justify-content-between align-items-center">
            <div className="item">
              <p>{total*20} ETH</p>
              <span>Total volume</span>
            </div>
            <hr />
            <div className="item">
              <p>{total*10} ETH</p>
              <span>listed</span>
            </div>

            <hr />
            <div className="item">
              <p>{Math.round(total/2)} ETH</p>
              <span>Owners</span>
            </div>
          </div>
        </div>
        <div className="topp">
          <button
            onClick={() => {
              setMarketPlace(null)
              fetchAll();
              togged(1);
            }}
            className={toggle === 1 ? "active" : "btn-small"}
          >
            All
          </button>
          <button
            id="but1"
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("arts");
              togged(2);
            }}
            className={toggle === 2 ? "active" : "btn-small"}
          >
            Art
          </button>
          <button
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("gaming");
              togged(3);
            }}
            className={toggle === 3 ? "active" : "btn-small"}
          >
            Gaming
          </button>
          <button
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("pfps");
              togged(4);
            }}
            className={toggle === 4 ? "active" : "btn-small"}
          >
            PFPs
          </button>
          <button
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("photography");
              togged(5);
            }}
            className={toggle === 5 ? "active" : "btn-small"}
          >
            Photography
          </button>
          <button
            onClick={() => {
              setMarketPlace(null)
              handleCatergory("membership");
              togged(6);
            }}
            className={toggle === 6 ? "active" : "btn-small"}
          >
            Membership
          </button>
        </div>

        <div className="markets">
          {marketPlace.data.map((item) => (
            <div className="nft__card" key={item.id}>
              <div className="card-hold">
                <div className="tops">
                  <Link to={`/MarketPlace/${item.id}`}>
                    <img
                      className="bg"
                      crossOrigin="anonymous"
                      src={domain + item.photo}
                      alt="nftImage"
                    />
                  </Link>
                  {/* <div className="glass">
                    <p>For Sale</p>
                  </div> */}
                </div>
                <div className="bottom">
                  <p>
                    <Link>{item.name}</Link>
                  </p>
                  <div className="profile">
                    <div className="left">
                      <div className="imgs-hold">
                        <img
                          crossOrigin="anonymous"
                          className="pics"
                          src={domain + item.nftOwner.photo}
                          alt="profileImg"
                        />
                      </div>
                      <div className="text">
                        <p>{item.nftOwner.username.length>8?(item.nftOwner.username).slice(0,8)+"...":item.nftOwner.username}</p>
                        <span>@{item.nftOwner.username.length>8?(item.nftOwner.username).slice(0,8)+"...":item.nftOwner.username}</span>
                      </div>
                    </div>
                    <div className="right">
                      <span>Current Bid</span>
                      <p>{item.priceInEtherium}ETH</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MarketPlace;
