import "./ForgotPassword.css";
import { BubblyLink } from "react-bubbly-transitions";
import ArrowBAck from "../../assets/DashboardImg/ArrowBack.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { domain } from "../../config";
import Swal from "sweetalert2";
function ForgotPassword() {
  const [input, setInput] = useState("");
  const [Loading, setLoading] = useState(false);
  function handleInput(e) {
    const email = e.target.value;
    setInput(email);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!input.includes("@") || !input.includes(".")) {
      return Swal.fire({
        icon: "error",
        title: "Please enter a valid email",
      });
      //  Swal('Failed!','Please enter a valid email','error')
    }
    setLoading(true);
    fetch(`${domain}/api/v1/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status === "fail") {
          return Swal.fire("Failed!", data.message, "error");
        } else {
          return Swal.fire("Success", data.message, "success");
          setLoading(false);
        }
      });
  }
  return (
    <>
      <div className="pass pass2">
        <div className="wrap">
          <div className="center">
            <form>
              <p data-aos="fade-up" data-aos-delay="30" className="head">
                Forgot Password
              </p>
              <p data-aos="fade-up" data-aos-delay="40" className="head2">
                No worries, we’ll send you reset instructions.
              </p>
              <div data-aos="fade-up" data-aos-delay="50" className="di">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleInput}
                  value={input}
                  className="inputs"
                  type="email"
                  placeholder="Please enter your email address"
                  autoComplete="none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bt"
                data-aos="fade-up"
                data-aos-delay="80"
                type="submit"
                disabled={Loading}
              >
                {!Loading ? (
                  "Send Mail"
                ) : (
                  <div className="p">
                    <span className="loader"></span>
                    <span className="pppp"> Sending...</span>
                  </div>
                )}
              </button>
              <p data-aos="fade-up" data-aos-delay="100" className="redirect">
                <img src={ArrowBAck} alt="arrow" /> Back to
                <span className="linker">
                  <BubblyLink className="linker" to="/Login"><a>Log In</a> </BubblyLink>
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
      </div>
    </>
  );
}

export default ForgotPassword;
