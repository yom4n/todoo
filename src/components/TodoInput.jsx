import React from "react";
import { useState } from "react";

function TodoInput(props) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="input-container">
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        type="Enter todo..."
      />
      <button className="add-button"
        onClick={() => {
          props.handleTasks(inputValue);
          setInputValue('')
        }}
      >
        Add
      </button>
    </div>
  );
}

export default TodoInput;
