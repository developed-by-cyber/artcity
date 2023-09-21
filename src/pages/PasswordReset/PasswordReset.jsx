import "./PasswordReset.css";
import { BubblyLink } from "react-bubbly-transitions";
import ArrowBAck from "../../assets/DashboardImg/ArrowBack.png";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

function PasswordReset() {
  const [otp, setOtp] = useState("");
  return (
    <>
      <div className="pass">
        <div className="wrap">
          <div className="center password-reset">
            <form>
              <p data-aos="fade-up" data-aos-delay="30" className="head">
                Password reset
              </p>
              <p data-aos="fade-up" data-aos-delay="40" className="head2">
                We sent a code to{" "}
                <span className="fw-bold">emanuelas@gmail.com</span>
              </p>
              <div data-aos="fade-up" data-aos-delay="50" className="di">
                <div className="ins">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    renderInput={(props) => (
                      <input className="inputs" {...props} />
                    )}
                  />
                </div>
              </div>
              <button
                className="bt"
                data-aos="fade-up"
                data-aos-delay="80"
                type="submit"
              >
                Continue
              </button>
              <p data-aos="fade-up" data-aos-delay="90" className="redirect">
                Didn’t receive any email?
                <span className="link">
                  <BubblyLink to="#">Click to resend</BubblyLink>
                </span>
              </p>
              <p data-aos="fade-up" data-aos-delay="100" className="redirect">
                <img src={ArrowBAck} alt="arrow" /> Back to
                <span className="link">
                  <BubblyLink to="/Login">Log In</BubblyLink>
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

export default PasswordReset;
