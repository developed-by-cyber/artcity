import "./NftProfile.css";
import { NFTData } from "../../assets/Data/Data";
import profileimg from "../../assets/DashboardImg/Ellipse 501 (1).png";
import Verified from "../../assets/DashboardImg/Verified.png";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useState,useEffect } from "react";
import { domain } from "../../config";
function NftProfile() {
  const [nftProfile,setNftProfile] = useState(null)
  const userDetails = JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
  fetch(`${domain}/api/v1/users/nftProfile/${userDetails.data.id}`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userDetails.token}`
    }
  })
  .then(res=>res.json())
  .then(data=>{
    setNftProfile(data.data)
  })
  },[])
  if(nftProfile === null){
    return(<Loader/>)
  }
  return (
    <>
      <div className="NftProfile">
        <p className="first-p">My Profile</p>
        <div className="profile-holder">
          <div className="profile-hold d-flex align-items-center gap-3">
            <div className="img-hold">
              <img crossOrigin="anonymous" src={`${domain}${nftProfile.photo}`} alt="profileImg" />
            </div>
            <div className="profile-name">
              <p>
                {nftProfile.username.length>8?(nftProfile.username).slice(0,8)+"...":nftProfile.username} {userDetails.data.userVerified&&<img src={Verified} alt="verified" />} 
              </p>
              <span className="username">@{nftProfile.username.length>8?(nftProfile.username).slice(0,8)+"...":nftProfile.username}</span>
            </div>
          </div>
          <div className="text-hold">
            <hr className="first-hr" />
            <div className="text">
              <p>{nftProfile.mintedNft}</p>
              <span>NFT <span className="adj">Minted</span></span>
            </div>
            <hr />
            <div className="text">
              <p>{nftProfile.soldNft}</p>
              <span>NFT <span className="adj">sold</span></span>
            </div>
            <hr />
            <div className="text">
              <p>{nftProfile.boughtNft}</p>
              <span>NFT <span className="adj">Bought</span></span>
            </div>
            <hr />
            <div className="text">
              <p>{nftProfile.myNft.length}</p>
              <span>NFT’s</span>
            </div>
          </div>
        </div>

        <div className="my-nfts">
          <p className="first-p">My NFT’s</p>

          <div className=" nft-hold">
            {nftProfile.myNft.map((Data) => (
              <div className="nftcard" key={Data.id}>
                <div className="card-hold">
                  <div className="tops">
                    <Link>
                      <img className="bg" crossOrigin="anonymous" src={domain+Data.photo} alt="nftImage" />
                    </Link>
                    {Data.nftInMarket?<div className="glass">
                  <p>For Sale</p>
                </div>:null}
                  </div>
                  <div className="bottom">
                    <div className="name">
                      <p>{Data.name}</p>
                      <div className="right">
                        <span>Current Bid</span>
                        <p>{Data.priceInEtherium} ETH</p>
                      </div>
                    </div>
                    <div className="profile">
                      <div className="left">
                        <div className="text"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default NftProfile;
