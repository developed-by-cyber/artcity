import "./Nfts.css";
import { NFTData } from "../../../assets/Data/Data";
import edit from "../../../assets/DashboardImg/edit.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Edit from "../Modals/Edit";

import { domain } from "../../../config";

function Nfts({userNft}) {
  const [nft, setNft] = useState(null) 
  const [Mod3, setMod3] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem('user'))
  return (   
    <div className="nfts">
      {Mod3 && <Edit setMod3={setMod3} nft={nft}/>}
      <p className="heading">NFT's</p>
      <div className="nft-hold">
        {userNft.length === 0?<h2 className="text-info">No Available Nfts!</h2>:null}
        {userNft.map((Data,index) => (
          <div className="nftcard" key={Data.id}>
            <div className="card-hold">
              <div className="tops">
                <Link to={`/MarketPlace/${Data.id}`}>
                  <img className="bg" crossOrigin="anonymous" src={`${domain}${Data.photo}`} alt="nftImage" />
                </Link>
                {Data.nftInMarket?<div className="glass">
                  <p>For Sale</p>
                </div>:null}
              </div>
              <div className="bottom">
                <div className="name">
                  <p>{Data.name}</p>
                  <img
                    onClick={(e) =>{
                      setMod3(true)
                      setNft(userNft[e.target.getAttribute('value')])
                    }}
                    className="edit"
                    width={"20px"}
                    src={edit}
                    alt="edit"
                    value={index}
                  />
                  {/* {Mod3 && <Edit setMod3={setMod3} nft={nft}/>} */}
                  
                  
                </div>
                <div className="profile">
                  <div className="left">
                   <div className="pics-hold">
                   <img
                      className="pics"
                      crossOrigin="anonymous"
                      src={`${domain}${userDetails.data.photo}`}
                      alt="profileImg"
                    />
                   </div>
                    <div className="text">
                    <p>{Data.nftOwner.username.length>8?(Data.nftOwner.username).slice(0,8)+"...":Data.nftOwner.username}</p>
                        <span>@{Data.nftOwner.username.length>8?(Data.nftOwner.username).slice(0,8)+"...":Data.nftOwner.username}</span>
                    </div>
                  </div>
                  <div className="right">
                    <span>Current Bid</span>
                    <p>{Data.priceInEtherium} ETH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nfts;
