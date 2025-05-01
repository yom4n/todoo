import TodoCard from "./TodoCard";
import { useEffect, useState } from "react";
import { useGetTodos } from "../hooks/useGetTodos";
import { useContext } from "react";
import { TodoDataContext } from "../Context";

function TodoList(props) {
  const { tasks, updateTasks, deleteTask, queryClient } = props;
  const { queryData, setQueryData } = useContext(TodoDataContext)

  const { data: fetchedData, isSuccess } = useGetTodos({ session: props.session });
  

  // useEffect(() => {
  //   setQueryData(fetchedData)
  // }, [isSuccess])

  if (fetchedData) {
    return (
      <div className="list-container">
        <ul>
          {fetchedData.map((task, taskIndex) => {
            return (
              <TodoCard
                key={task.id}
                taskID={task.id}
                identifier={taskIndex}
                imageUrl={task.image_url}
                task={task.todo}
                updateTasks={updateTasks}
                deleteTask={deleteTask}
                queryClient={queryClient}
              ></TodoCard>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
