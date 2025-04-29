import React from "react";
import TodoCard from "./TodoCard";
import { useEffect, useState } from "react";
import { useGetTodos } from "../hooks/useGetTodos";

function TodoList(props) {
  const { tasks, updateTasks, deleteTask } = props;
  // useEffect(()=>{console.log("list rerendered")},[tasks])
  // const { data, isLoadingError } = useGetTodos()

  const { data } = useGetTodos({ session: props.session });

  if (data) {
    return (
      <ul>
        {data.map((task, taskIndex) => {
          return (
            <TodoCard
              key={task.id}
              identifier={taskIndex}
              image={task.image_url}
              task={task.todo}
              updateTasks={updateTasks}
              deleteTask={deleteTask}
            ></TodoCard>
          );
        })}
      </ul>
    );
  }
}

export default TodoList;
