import "./Register.css";
import { Link } from "react-router-dom";
import icon from "../../assets/fluent-mdl2_navigate-back.png";
import { BubblyLink } from "react-bubbly-transitions";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { domain } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../providers/auth";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
    username: false,
  });
  const [error, setError] = useState("");
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
    setLoading(true);
    setInputErrors(() => {
      return {
        email: false,
        password: false,
        passwordConfirm: false,
        username: false,
      };
    });
    if (input.password.length < 8) {
      setInput((preValue) => {
        return {
          ...preValue,
          password: "",
        };
      });
      setInputErrors((preValue) => {
        return {
          ...preValue,
          password: true,
        };
      });
      setError("Password length must be 8 and above");
      return toast.error("Password must be atleast 8 characters long");
    } else if (input.password !== input.passwordConfirm) {
      setInput((preValue) => {
        return {
          ...preValue,
          passwordConfirm: "",
        };
      });
      setInputErrors((preValue) => {
        return {
          ...preValue,
          passwordConfirm: true,
        };
      });
      setError("passwords do not match");
      return toast.error("Passwords do not match");
    } else {
      fetch(`${domain}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.status !== "success") {
            return toast.error(data.message);
          } else {
            auth.verify(data);
            toast.success("Registration Successfully");
            fetch(`${domain}/api/v1/users/createEmailToken`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                navigate("/EmailVerification");
              });
          }
        });
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };
  return (
    <div className="wrap">
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
            Register
          </p>
          <p data-aos="fade-up" data-aos-delay="40" className="head2">
            Welcome! Please fill in your credentials
          </p>
          <div data-aos="fade-up" data-aos-delay="50" className="di">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleInput}
              name="username"
              className="inputs"
              type="text"
              placeholder="Username"
              value={input.username}
              autoComplete="none"
            />
            <p style={{ color: "red" }}>
              {inputErrors.username ? error : null}
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="60" className="di">
            <label htmlFor="email">Email Address</label>
            <input
              onChange={handleInput}
              name="email"
              className="inputs"
              type="email"
              placeholder="Enter your email address"
              value={input.email}
              autoComplete="none"
            />
            <p style={{ color: "red" }}>{inputErrors.email ? error : null}</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="70" className="di2">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              onChange={handleInput}
              className="inputs"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              value={input.password}
            />
            <p className="errors" style={{ color: "red" }}>
              {inputErrors.password ? error : null}
            </p>
            <AiOutlineEye
              onClick={togglePassword}
              className="show"
              color="white"
              size={"20px"}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="80" className="di2">
            <label htmlFor="password">Confirm Password</label>
            <input
              name="passwordConfirm"
              onChange={handleInput}
              className="inputs"
              type={passwordShown2 ? "text" : "password"}
              placeholder="Password"
              value={input.passwordConfirm}
            />
            <p className="errors" style={{ color: "red" }}>
              {inputErrors.passwordConfirm ? error : null}
            </p>
            <AiOutlineEye
              onClick={togglePassword2}
              className="show"
              color="white"
              size={"20px"}
            />
          </div>

          <button
            className="bbb"
            data-aos="fade-up"
            data-aos-delay="90"
            type="submit"
            onClick={handleSubmit}
            disabled={Loading}
          >
            {!Loading ? (
              "Sign Up"
            ) : (
              <div className="p">
                <span className="loader"></span>
                <span className="pppp"> Registering...</span>
              </div>
            )}
          </button>
          <p data-aos="fade-up" data-aos-delay="100" className="redirect">
            Don’t have an account?
            <span className="link">
              <BubblyLink to="/Login">Sign In</BubblyLink>
            </span>
          </p>
        </form>
      </div>
      <div className="bottom">
        <div data-aos="fade-up" data-aos-delay="110" className="bottom-left">
          <p>Need help? Contact</p>
          <Link href="#">Contact hello@Artcity.com</Link>
        </div>
        <hr />
        <div className="bottom-right">
          <p data-aos="fade-up" data-aos-delay="120" data-aos-offset="10">
            2023 Artcity. All Rights are reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
