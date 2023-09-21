import "./Settings.css";
import Verified from "../../assets/DashboardImg/Verified.png";
import { useState, useEffect, useRef } from "react";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";
import { domain } from "../../config";
import { useAuth } from "../../providers/auth";
import { useNavigate } from "react-router-dom";
import Img9 from "../../assets/DashboardImg/logout.png";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
function Settings() {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const [myDetails, setMyDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    password: "",
    currentPassword: "",
    passwordConfirm: "",
  });
  function handleInput(e) {
    const { name, value } = e.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if(input.password.length < 8 || input.currentPassword.length < 8){
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Password must be up to 8 characters",
      });
    }else if (input.password !== input.passwordConfirm) {
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Passwords do not match",
      });
    }
    setLoading(true)
    fetch(`${domain}/api/v1/users/chaingeMyPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        if(data.status === "error"){
          return  Swal.fire({
            icon: "error",
            title: "Opps!",
            text: "Incorrect Password",
          });
        }
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: "Password Reset Successful",
        });
        localStorage.clear();
        navigate("/login");
      });
  }
  useEffect(() => {
    fetch(`${domain}/api/v1/users/myDetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyDetails(data);
      });
  }, []);
  if (myDetails === null) {
    return <Loader />;
  }

  // for the image upload
  const imageUpload = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const HandleImageChange = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("photo", file);
    fetch(`${domain}/api/v1/users/myDetails`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          return Swal.fire({
            icon: "error",
            title: "Opps!",
            text: "Update failed",
          });
        } else {
          setImage(file);
          Swal.fire({
            icon: "success",
            title: "Great!",
            text: "Profile updated",
          });
        }
      });
  };

  return (
    <>
      <div className="Settings">
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
        <div className="toper">
          <p className="pp">Settings</p>
          <Link to="/Login" className="logout">
          <span>Log out</span>
            <img src={Img9} alt="account" />
          </Link>
        </div>
        <div className="settings-hold d-flex justify-content-between align-items-center">
          <div className="left">
            <form encType="multipart/form-data">
              <p className="p1">Change Profile Picture</p>
              <div className="profile-hold d-flex align-items-center gap-3">
                <div className="img-hold">
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="profileImg" />
                  ) : (
                    <img
                      crossOrigin="anonymous"
                      src={domain + myDetails.data.photo}
                      alt="profileImg"
                    />
                  )}
                </div>

                <input
                  onChange={HandleImageChange}
                  type="file"
                  style={{ display: "none" }}
                  ref={inputRef}
                />
                <div className="profile-name">
                  <p>
                    {myDetails.data.username.length>8?(myDetails.data.username).slice(0,8)+"...":myDetails.data.username}{" "}
                    {myDetails.data.userVerified && (
                      <img src={Verified} alt="verified" />
                    )}
                  </p>
                  <span className="username">@{myDetails.data.username.length>8?(myDetails.data.username).slice(0,8)+"...":myDetails.data.username}</span>
                </div>
              </div>
              <button onClick={imageUpload}>Upload Picture</button>
            </form>
          </div>
          <div className="right">
            <p>Change Password</p>
            <div className="inputs-hold">
              <input
                onChange={handleInput}
                name="currentPassword"
                value={input.currentPassword}
                className="inputs"
                type="password"
                placeholder="Current Password"
              />
              <input
                onChange={handleInput}
                name="password"
                value={input.password}
                className="inputs"
                type="password"
                placeholder="New Password"
              />
              <input
                onChange={handleInput}
                name="passwordConfirm"
                value={input.passwordConfirm}
                className="inputs"
                type="password"
                placeholder="Confirm Password"
              />
              <button 
              disabled={Loading}
              onClick={handleSubmit}>
              {!Loading ? 
                  "Change Password"
                :
                  <div className="p">
                    <span className="loader"></span>
                    <span className="pppp"> Updating...</span>
                  </div>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
