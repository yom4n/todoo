import TodoCard from "./TodoCard";
import { useEffect, useState } from "react";
import { useGetTodos } from "../hooks/useGetTodos";
import { useContext } from "react";
import { TodoDataContext } from "../Context";

function TodoList(props) {
  const { tasks, updateTasks, deleteTask } = props;
  const { queryData, setQueryData } = useContext(TodoDataContext)

  const { data: fetchedData, isSuccess } = useGetTodos({ session: props.session });
  

  useEffect(() => {
    setQueryData(fetchedData)
  }, [isSuccess])

  if (queryData) {
    return (
      <div className="list-container">
        <ul>
          {queryData.map((task, taskIndex) => {
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
      </div>
    );
  }
}

export default TodoList;
