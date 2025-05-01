import React from "react";
import { LiaEdit } from "react-icons/lia";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { useState } from "react";
import { useDeleteFile, useDeleteTodo } from "../hooks/useDeleteTodo";

function TodoCard(props) {
  const { task, taskID, identifier, imageUrl, updateTasks, deleteTask, queryClient } = props;

  const [editState, setEditState] = useState(false);
  const [editInputValue, setEditInputValue] = useState(task);
  function handleEdit() {
    if (editState == false) {
      setEditState(!editState);
    } else {
      updateTasks(editInputValue, identifier);
      setEditState(!editState);
    }
  }

  function handleDelete() {
    deleteTask(identifier);
  }
  const {mutate: deleteTodo} = useDeleteTodo({queryClient: queryClient, imageUrl: imageUrl})
  return (
    <li className="todo-item">
      {editState ? (
        <>
          <input
            value={editInputValue}
            onChange={(e) => {
              setEditInputValue(e.target.value);
            }}
            type="Enter todo..."
          />
          <button onClick={handleEdit}>
            <MdOutlineDone />
          </button>
        </>
      ) : (
        <>
          <img src={imageUrl} alt="" />

          <div className="task">{task}</div>
          <div className="button-container">
            <button onClick={handleEdit}>
              <LiaEdit className="icon-edit" />
            </button>
            <button onClick={()=> deleteTodo({id: taskID, imageUrl: imageUrl})}>
              <FaRegTrashAlt className="icon-trash" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoCard;
