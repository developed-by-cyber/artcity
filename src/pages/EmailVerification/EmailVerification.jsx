import { Link } from "react-router-dom";
import "./EmailVerification.css";
import { useState } from "react";
import { useAuth } from "../../providers/auth";
import { ToastContainer, toast } from "react-toastify";
import { domain } from "../../config";

function EmailVerification() {
  const user = localStorage.getItem("user");
  const emailDetails = localStorage.getItem("details");
  const [Loading, setLoading] = useState(false);
  let token;
  let email;
  if (JSON.parse(user)) {
    email = JSON.parse(user).data.email;
    token = JSON.parse(user).token;
  } else if (JSON.parse(emailDetails)) {
    email = JSON.parse(emailDetails).data.user.email;
    token = JSON.parse(emailDetails).token;
  } else {
    email = null;
    token = null;
  }
  console.log(email, token);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    if (!JSON.parse(emailDetails)) {
      return toast.error("No email associated with this request");
    }
    fetch(`${domain}/api/v1/users/createEmailToken`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        toast.success("email sent to this address");
      });
  }
  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <div className="pass">
        <div className="wrap">
          <div className="center email-verification">
            <form>
              <p data-aos="fade-up" data-aos-delay="30" className="head">
                Email Verification
              </p>
              <p data-aos="fade-up" data-aos-delay="40" className="head2">
                check your email for a verification link sent
              </p>
              <div data-aos="fade-up" data-aos-delay="60" className="di">
                <label htmlFor="email">Your email</label>
                <input
                  className="inputs"
                  type="email"
                  placeholder="Elemelutony@gmail.com"
                  value={email}
                  readOnly
                />
              </div>
              <p className="head3 h4" data-aos="fade-up" data-aos-delay="70">
                Didn’t receive any mail, Please check your
              </p>
              <p className="head3" data-aos="fade-up" data-aos-delay="80">
                spam folders or Resend the email
              </p>
              <button
                className="bbb"
                data-aos="fade-up"
                data-aos-delay="90"
                type="submit"
                onClick={handleSubmit}
                disabled={Loading}
              >
                {!Loading ? 
                  "Send Mail"
                :
                  <div className="p">
                    <span className="loader"></span>
                    <span className="pppp"> Sending...</span>
                  </div>
                }
              </button>
            </form>
          </div>
          <div className="bottom">
            <div
              data-aos="fade-up"
              data-aos-delay="110"
              className="bottom-left"
            >
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
      </div>
    </>
  );
}

export default EmailVerification;
