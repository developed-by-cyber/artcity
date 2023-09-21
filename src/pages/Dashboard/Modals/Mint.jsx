import "./Mint.css";
import Close from "../../../assets/close.png";
import star from "../../../assets/Star 3.png";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import { domain } from "../../../config";
import Successful from "./Successful";
const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

function Mint({ setMod }) {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    name: "",
    category: "",
    priceInEtherium: 0,
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccesMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  function turnOff() {
    setSuccess(false);
    setMod(false);
  }
  function handleInput(e) {
    const { name, value } = e.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  const handleChange = (file) => {
    setFile(file);
  };
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      setMod(false);
      return Swal.fire("Opps!", "Image of Nft is required", "error");
    } else if (input.priceInEtherium < 0.2) {
      setMod(false);
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Nft price must be greater than 0.2",
      });
    }else if(input.priceInEtherium > 200){
      setMod(false);
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Nft price must be less than 200 ETH",
      });
    } else {
      const data = new FormData();
      data.append("photo", file[0]);
      data.append("priceInEtherium", input.priceInEtherium);
      data.append("category", input.category);
      data.append("name", input.name);
      data.append("description", input.description);
      fetch(`${domain}/api/v1/nft`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "error") {
            setMod(false);
            return Swal.fire("Opps!", data.message, data.status);
          } else if (data.status === "success") {
            setSuccess(true);
            setSuccesMessage(data.message);
            setLoading(false);
          }
        });
    }
  }
  return (
    <>
      <div className="modal-wrapper">
        {success ? (
          <Successful title={successMessage} turnOff={turnOff} />
        ) : null}
        <div className="mod1">
          <div className="modal-hold">
            <div className="top d-flex justify-content-between align-items-center">
              <div className="left">
                <p>Create New item</p>
                <span>
                  <img src={star} alt="star" />
                  Label required field
                </span>
              </div>
              <img onClick={() => setMod(false)} src={Close} alt="close" />
            </div>
            <div className="add-file">
              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="photo"
                types={fileTypes}
              />
              <p className=" text-white-50">
                {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
              </p>
            </div>

            <form encType="multipart/form-data">
              <label>
                <img src={star} alt="star" />
                Name
              </label>
              <input
                onChange={handleInput}
                name="name"
                value={input.name}
                type="text"
                placeholder="Enter your Nft Name"
              />
              <div className="select-hold">
                <div className="select">
                  <label>
                    <img src={star} alt="star" /> Categories
                  </label>
                  <select
                    onChange={handleInput}
                    className="sel"
                    name="category"
                  >
                    <option value={"others"}>Select Categories</option>
                    <option value={"photography"}>photography</option>
                    <option value={"gaming"}>Gaming</option>
                    <option value={"pfps"}>pfps</option>
                    <option value={"membership"}>Membership</option>
                    <option value={"arts"}>arts</option>
                  </select>
                </div>
                <div className="prices">
                  <label>
                    <img src={star} alt="star" />
                    Amount (ETH)
                  </label>
                  <input
                    onChange={handleInput}
                    name="priceInEtherium"
                    value={input.priceInEtherium}
                    className="price"
                    type="text"
                    placeholder="NFT Price"
                  />
                </div>
              </div>
              <div className="descriptions">
                <label>Description</label>
                <textarea onChange={handleInput} name="description"></textarea>
              </div>
              <div className="button">
                <button
                  onClick={handleSubmit}
                  className="bt1"
                  disabled={Loading}
                >
                  {!Loading ? (
                    "Mint"
                  ) : (
                    <div className="p">
                      <span className="loader"></span>
                      <span className="pppp"> Minting...</span>
                    </div>
                  )}
                </button>

                <button onClick={turnOff} className="bt2">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mint;
