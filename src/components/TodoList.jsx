import React from "react";
import TodoCard from "./TodoCard";
import { useEffect, useState} from "react";

function TodoList(props) {
  const { tasks, updateTasks, deleteTask } = props;
  // useEffect(()=>{console.log("list rerendered")},[tasks])
  return (
    <ul>
      {tasks.map((task, taskIndex) => {
        return (
          <TodoCard key={taskIndex} identifier={taskIndex} task={task} updateTasks={updateTasks} deleteTask={deleteTask}>
          </TodoCard>
        );
      })}
    </ul>
  );
}

export default TodoList;
