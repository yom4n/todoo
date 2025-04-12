import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { useEffect } from 'react'

function App() {
  // let tasks = [
  //   "Learn react for god's sake",
  //   "Make a project for god's sake",
  //   "Stop watching tutorials for god's sake",
  // ];

  const [tasks, setTasks] = useState(()=>{
    const storedList = localStorage.getItem('tasks');
    return (storedList ? JSON.parse(storedList) : [])
  })


  const handleTasks = (inputValue)=> {
    setTasks([...tasks, inputValue])
  }
  const updateTasks = (editInputValue, identifier)=> {
    // * map creates a completely new array so the array referrence also changes

    setTasks(tasks.map((task, index)=>{
      if(index == identifier){
        return editInputValue
      }
      return task
    }))
  }

  const deleteTask = (identifier)=>{
    // * splice is note recommended as it mutates the array and react only rerenders when a new array is passed
    // * i.e. array reference is changed
    let newTasks = [...tasks]
    newTasks.splice(identifier, 1);
    setTasks(newTasks)
    console.log(tasks)

  }

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])

  return (
    <div className='base-container'>
      <TodoInput handleTasks={handleTasks}/>
      <TodoList tasks={tasks} updateTasks={updateTasks} deleteTask={deleteTask}/>
    </div>
  )
}

export default App
