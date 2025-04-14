import React from "react";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { LuAudioLines } from "react-icons/lu";



function TodoInput(props) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="input-container">
      <div className="textarea-container">
        <textarea 
          rows={1}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        <span className="placeholder">Enter todo</span>
      </div>
      {/* <button></button> */}
      <div className="input-buttons">
        <button className="voice-button">
          <LuAudioLines className="icon-voice"/>
        </button>
        <button className="image-button">
          <FaRegImage className="icon-image"/>
        </button>
        <button
          className="add-button"
          onClick={() => {
            props.handleTasks(inputValue);
            setInputValue("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoInput;
