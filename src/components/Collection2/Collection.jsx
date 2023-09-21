import "./Collection.css";
import { Uses } from "../../assets/Data/Data";

function Collection2({ worksRef }) {
  return (
    <>
    <div className="wo-hold">
      <div ref={worksRef} className="wo"></div>
    </div>
      <div className="collection2">
      <p className="p" data-aos="zoom-in" data-aos-offset="200" data-aos-delay="delay">How it Works?</p>
        <div className="card-hold">
        <div className="cir"></div>
          {Uses.map((item) => (
            <div className="cards" key={item.id} data-aos="fade-up" data-aos-offset="300" data-aos-delay="delay">
              <div className="top">
                <div className="holds">
                  <img src={item.icon} alt="wallet" />
                </div>
              </div>
              <div className="bottom">
                <h1 className="heading ">{item.title}</h1>
                <p>{item.dec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Collection2;
