import { Navbar } from "../../components";
import Support from "../Dashboard/Support/Support";
import "./Terms.css";
const Terms = () => {
  return (
    <>
      <div className="terms-holder">
        <Support />
      <div className="wrapper">
            <Navbar />
          </div>
        <div className="head">
          <div className="text-hold">
            <h1 data-aos="fade-down" data-aos-delay="300">
              Terms and Conditions
            </h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="content">
            <p className="p1">
              Welcome to <strong>Artcity</strong>. These <strong>Terms
              and Conditions</strong> govern your use of the Website, including the
              purchase, sale, and trading of NFTs. By using the website, you
              agree to these terms. Please read them carefully.
            </p>
            <h3>1. Account Creation</h3>
            <p>
              <strong></strong> To use certain features of the website, you may
              need to create an account. You agree to provide accurate,
              complete, and current information when registering and to update
              such information as needed.
            </p>
            <p className="p2">
              <strong>1.2.</strong> You are responsible for maintaining the
              confidentiality of your account information, including your
              password. You are responsible for all activities that occur under
              your account.
            </p>
            <h3>2. Buying and Selling NFTs</h3>
            <p>
              <strong>2.1.</strong> Users may buy, sell, and trade NFTs on the
              Website.
            </p>
            <p>
              <strong>2.2. The Website charges the following fees:</strong>
              <br />
              <strong>a.</strong> Commission Fee: When you sell an NFT, a
              commission fee will be deducted from the final sale price. The
              specific commission is a percentage of the artworks sold.
            </p>
            <p>
              <strong>b.</strong> Tax Fee: Depending on your jurisdiction, you
              may be subject to tax on your NFT transactions. It is your
              responsibility to understand and comply with tax regulations
              applicable to your jurisdiction.
            </p>
            <p className="p2">
              <strong>C.</strong> If it is determined that you have stolen
              artwork and attempted to sell it on this platform, your assets
              will be temporarily suspended until you can provide proof of
              ownership.
            </p>
            <h3>3. Ownership and Licensing</h3>
            <p>
              <strong>3.1.</strong> Ownership of NFTs is recorded on the
              blockchain. The website does not take ownership of NFTs listed on
              the platform.
            </p>
            <p className="p2">
              <strong>3.2.</strong> When you purchase an NFT, you are granted a
              non-exclusive, non-transferable license to use, display, and
              transfer the NFT for personal, non-commercial purposes, subject to
              these Terms.
            </p>
            <h3>4. Prohibited Activities</h3>
            <p>
              <strong>
                4.1. You agree not to engage in any of the following activities
                on the website:
              </strong>
              <br /> <strong>a.</strong> Violate any applicable laws or
              regulations.
            </p>
            <p>
              <strong>b.</strong> Infringe upon the intellectual property rights
              of others.
            </p>
            <p className="p2">
              <strong>c.</strong> Attempt to manipulate or defraud the website
              or its users.
            </p>
            <h3>5. Termination</h3>
            <p className="p2">
              <strong>5.1.</strong> The Website reserves the right to suspend or
              terminate your account if you violate these Terms or engage in any
              fraudulent or illegal activities.
            </p>
            <h3>6. Disclaimer of Warranties</h3>
            <p className="p2">
              <strong>6.1.</strong> The website is provided "as is" and "as
              available." We make no warranties regarding the accuracy,
              reliability, or availability of the Website.
            </p>
            <h3>7. Limitation of Liability</h3>
            <p className="p2">
              <strong>7.1.</strong> To the fullest extent permitted by law, we
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or relating to
              your use of the Website.
            </p>
            <h3>8. Changes to Terms</h3>
            <p className="p2">
              <strong>8.1.</strong> We may update these terms from time to time.
              Any changes will be posted on the website, and your continued use
              of the website after such changes constitutes acceptance of the
              revised terms.
            </p>
            <p className="p2">For any questions or concerns, please contact our support team.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
