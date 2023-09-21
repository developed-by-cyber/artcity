import { Link, Outlet } from "react-router-dom";
import "./Card.css";
import { domain } from "../../config";
function Nft__Card(props) {
  return (
    <>
      <div className="nft__card" >
        <div className="card-hold">
          <div className="tops">
            <Link><img className="bg" crossOrigin="anonymous" src={domain+props.item.photo} alt="nftImage" /></Link>
            <div className="glass">
              <p>For Sale</p>
            </div>
          </div>
          <div className="bottom">
            <p><Link>{props.item.name}</Link></p>
            <div className="profile">
              <div className="left">
               <div className="imgs-hold">
               <img className="pics" crossOrigin="anonymous" src={domain+props.item.nftOwner.photo} alt="profileImg" />
               </div>
                <div className="text">
                  <p>{props.item.nftOwner.username}</p>
                  <span>{props.item.nftOwner.username}</span>
                </div>
              </div>
              <div className="right">
                <span>Current Bid</span>
                <p>{props.item.priceInEtherium}ETH</p>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Nft__Card;
