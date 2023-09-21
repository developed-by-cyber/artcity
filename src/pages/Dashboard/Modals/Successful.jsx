import "./Successful.css";
import Close from "../../../assets/close.png";
import Succes from "../../../assets/Success.png";

function Successful({ setMod4,title,turnOff }) {
  return (
    <>
      <div className="modal-wrapper modss">
        <div className="mod4">
          <div className="top">
            <img onClick={() => {turnOff()}} src={Close} alt="close" />
          </div>
          <div className="sucess">
            <img src={Succes} alt="icon" />
            <p>Successful</p>
            <p className="p2">{title}</p>
            <button onClick={() => turnOff()}>Ok</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Successful;
