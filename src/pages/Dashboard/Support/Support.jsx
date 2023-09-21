import React from "react";
import "./Support.css";
import { useState } from "react";
import imgg from "../../../assets/chat.png";
import TextareaAutosize from "react-autosize-textarea";
import { BiSolidMessage } from "react-icons/bi"
import { ImCross } from "react-icons/im"

function Support() {

  const chatInput = document.querySelector(".chat-input textarea");
  const chatbox = document.querySelector(".chatbox");
  let userMessage;
  const [input, setInput] = useState({
    value: "",
  });
  function tog() {
    document.body.classList.toggle("show-chatbot");
  }
  function removetog() {
    document.body.classList.remove("show-chatbot");
  }

  function hand(e) {
    setInput({ value: e.target.value });
    const texters = document.getElementById("texts");
    texters.style.maxHeight = "180px";
    texters.style.overflowY = "hidden";
  }
  function createChatLi(message, className) {
    // create a chat <li> element with passed message and classname
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatcontent =
      className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatcontent;
    return chatLi;
  }
  function HandelChat() {
    // append the users message to chatbox
    userMessage = chatInput.value;
    if (!userMessage) return;
    chatInput.value = "";
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // admin message or response
    chatbox.appendChild(createChatLi("response", "incoming"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // autosize textarea 
    const texters = document.getElementById("texts");
    texters.style.maxHeight = "0px";
    texters.style.overflowY = "hidden";
  }


  return (
    <>
      {/* <button onClick={tog} className="chatbot-toggler">
        <span className="material-symbols-rounded"><BiSolidMessage className="ice" /></span>
        <span className="material-symbols-outlined"><ImCross className="ice2"/></span>
      </button>
      <div className="chatbot">
        <header>
          <div className="h">
            <div className="crc">
              <img src={imgg} alt="bot" />
            </div>
            <p>support</p>
          </div>
          <span
            onClick={removetog}
            className="close-btn material-symbols-outlined"
          >
            close
          </span>
        </header>
        <ul className="chatbox">
          <li className="chat incoming">
            <span className="material-symbols-outlined">smart_toy</span>
            <p>
              Hi there 👋
              <br />
              How can I help you today?
            </p>
          </li>
        </ul>
        <div className="chat-input">
          <TextareaAutosize
            style={{ maxHeight: 180, boxSizing: "border-box" }}
            placeholder="Enter a message..."
            spellCheck="false"
            required
            id="texts"
            onChange={hand}
          />
          <span
            onClick={HandelChat}
            id="send-btn"
            className="material-symbols-outlined"
          >
            send
          </span>
        </div>
      </div> */}
    </>
  );
}
export default Support;
