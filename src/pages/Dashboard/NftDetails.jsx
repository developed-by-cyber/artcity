import "./NftDetails.css";
import Notifiaction from "./Notification/Notifiaction";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NFTData } from "../../assets/Data/Data";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Successful from "./Modals/Successful";
import { domain } from "../../config";
import Loader from "../../components/loader/Loader";
import icon from "../../assets/fluent-mdl2_navigate-back.png";
import Swal from "sweetalert2";
import Support from "./Support/Support";
function NftDetails(props) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams();
  const [nft, setNft] = useState(null);
  const [title, setTitle] = useState("");
  const [Loading, setLoading] = useState(false);
  const [categoryNft, setCategoryNft] = useState(null);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    fetch(`${domain}/api/v1/nft/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNft(data);
        handleCatergory(data.data.category);
        convertEth(data.data.priceInEtherium);
      });
  }, []);
  function handleCatergory(categories) {
    fetch(
      `${domain}/api/v1/nft?nftInMarket=true&sort=-priceInEtherium&category=${categories}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategoryNft(data);
      });
  }
  function convertEth(value) {
    fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
      .then((res) => res.json())
      .then((data) => {
        setPrice(data.USD * value);
      });
  }
  function turnOff() {
    setMod4(false);
  }
  const singleNft = NFTData.filter((item) => item.id === parseInt(2));
  const newSingleNft = Array.from(singleNft);
  const [Mod4, setMod4] = useState(false);
  if (nft === null || categoryNft === null) {
    return <Loader />;
  }
  return (
    <>
      <div className="details-hold" key={nft.data.id}>
        <div className="wrapper">
          <Link className="rex" to="/Dashboard">
            <img className="bac" src={icon} alt="icon" />
          </Link>
        </div>
        <Notifiaction />
        <div className="nft-details">
          <Support />
          <div className="left">
            <img
              className="nft-image"
              crossOrigin="anonymous"
              src={domain + nft.data.photo}
              alt="nftImg"
            />
          </div>
          <div className="right">
            <p className="nft-name">{nft.data.name}</p>
            <span className="offer">Best Offer</span>
            <h4 className="price1">{nft.data.priceInEtherium}ETH</h4>
            <span className="price p-2">${price}</span>
            <p className="details">
              {nft.data.description}.
            </p>
            <p className="creator">by {nft.data.nftOwner.username.length>8?(nft.data.nftOwner.username).slice(0,8)+"...":nft.data.nftOwner.username}</p>
            <button
              disabled={Loading}
              onClick={() => {
                setLoading(true);
                fetch(`${domain}/api/v1/nft/buyNft/${nft.data.id}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userDetails.token}`,
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status === "fail") {
                      Swal.fire("Opps!", data.message, "error");
                      setLoading(false);
                    } else {
                      setTitle(data.message);
                      setMod4(true);
                      setLoading(false);
                    }
                  });
              }}
            >
              {!Loading ? (
                "Buy Now"
              ) : (
                <div className="p">
                  <span className="loader"></span>
                  <span className="pppp">Buying...</span>
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="more">
          <h3>More on Collection</h3>
          <div className="more-cards">
            <Slider {...settings}>
              {categoryNft.data.map((item) => (
                <div onClick={()=>{
                  navigate('/temporary-location');
                  setTimeout(()=>{
                    navigate(`/marketplace/${item.id}`)
                  },100)
                }} className="nft__card" key={item.id}>
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
                      <div className="glass">
                        <p>For Sale</p>
                      </div>
                    </div>
                    <div className="bottom">
                      <p>
                        <Link>{item.name}</Link>
                      </p>
                      <div className="profile">
                        <div className="left">
                          <div className="imgs-hold">
                            <img
                              className="pics"
                              crossOrigin="anonymous"
                              src={domain + item.nftOwner.photo}
                              alt="profileImg"
                            />
                          </div>
                          <div className="text">
                            <p>{item.nftOwner.username.length>8?(item.nftOwner.username).slice(0,8):item.nftOwner.username}</p>
                            <span>@{item.nftOwner.username.length>8?(item.nftOwner.username).slice(0,8):item.nftOwner.username}</span>
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
            </Slider>
          </div>
        </div>
      </div>

      {Mod4 && <Successful turnOff={turnOff} title={title} setMod4={setMod4} />}
    </>
  );
}

export default NftDetails;
