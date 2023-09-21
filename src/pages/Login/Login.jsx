import React from "react";
import "./Login.css";
import { AiOutlineEye } from "react-icons/ai";
import icon from "../../assets/fluent-mdl2_navigate-back.png";
import { BubblyLink } from "react-bubbly-transitions";
import { Link } from "react-router-dom";
import { useState } from "react";
import { domain } from "../../config";
import { useAuth } from "../../providers/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [Loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const auth = useAuth();
  const navigator = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  function handleInput(e) {
    const { name, value } = e.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    fetch(`${domain}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((content) => {
        const user = {};
        if (content.status === "success") {
          user["token"] = content.token;
          user["data"] = content.data.user;
          auth.login(user);
          return localStorage.getItem("user");
        } else {
          toast.error(content.message);
          return null;
        }
      })
      .then((user) => {
        setLoading(false);
        
        
        if (user) {
          toast.success("Login successful");
          navigator("/dashboard");
        }
      });
  }
  return (
    <div className="wrap log">
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <div
        data-aos="fade-down"
        data-aos-delay="20"
        data-aos-offset="10"
        className="topper"
      >
        <BubblyLink to="/">
          <img
            data-aos="fade-down"
            data-aos-delay="100"
            data-aos-offset="10"
            className="back"
            src={icon}
            alt="back"
          />
        </BubblyLink>
        <span data-aos="fade-down" data-aos-delay="200" data-aos-offset="10">
          Back
        </span>
      </div>
      <div className="center">
        <form>
          <p data-aos="fade-up" data-aos-delay="30" className="head">
            Login
          </p>
          <p data-aos="fade-up" data-aos-delay="40" className="head2">
            Welcome back!
          </p>
          <div data-aos="fade-up" data-aos-delay="50" className="di">
            <label htmlFor="email">Email Address</label>
            <input
              onChange={handleInput}
              name="email"
              value={input.email}
              className="inputs"
              type="email"
              placeholder="Enter your email address"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="60" className="di2">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleInput}
              name="password"
              value={input.password}
              className="inputs"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
            />
            <AiOutlineEye
              onClick={togglePassword}
              className="show"
              color="white"
              size={"20px"}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="70" className="remember">
            <div className="left">
              <input className="check" type="checkbox" />
              <span> Remember me</span>
            </div>
            <div className="right">
              <Link to="/ForgotPassword">Forgot Password?</Link>
            </div>
          </div>
          <button
            className="bt"
            data-aos="fade-up"
            data-aos-delay="80"
            type="submit"
            onClick={handleSubmit}
            disabled={Loading}
          >
            {!Loading ? (
              "Log In"
            ) : (
              <div className="p">
                <span className="loader"></span>
                <span className="pppp"> Logging In...</span>
              </div>
            )}
          </button>
          <p data-aos="fade-up" data-aos-delay="90" className="redirect">
            Don’t have an account?
            <span className="link">
              <BubblyLink to="/Register">Sign Up</BubblyLink>
            </span>
          </p>
        </form>
      </div>
      <div className="bottom">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-offset="10"
          className="bottom-left"
        >
          <p>Need help? Contact</p>
          <Link href="#">Contact hello@Artcity.com</Link>
        </div>
        <hr />
        <div className="bottom-right">
          <p data-aos="fade-up" data-aos-delay="110" data-aos-offset="10">
            2023 Artcity. All Rights are reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
