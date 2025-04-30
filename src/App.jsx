import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { TodoDataContext } from "./Context";

import {supabase} from './supabaseClient'


const queryClient = new QueryClient()

function App() {


  // * const [tasks, setTasks] = useState(() => {
  // *   const storedList = localStorage.getItem("tasks");
  // *   return storedList ? JSON.parse(storedList) : [];
  // * });
  const [queryData, setQueryData] = useState()

  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  const handleTasks = (inputValue) => {
    // * setTasks([...tasks, inputValue]);
  };
  const updateTasks = (editInputValue, identifier) => {
    // * map creates a completely new array so the array referrence also changes
  }



  const deleteTask = (identifier) => {
    // * splice is note recommended as it mutates the array and react only rerenders when a new array is passed
    // * i.e. array reference is changed
    // * let newTasks = [...tasks];
    // * newTasks.splice(identifier, 1);
    // * setTasks(newTasks);
    // * console.log(tasks);
  };


  if (!session) {
    return (
      <div className="auth-container">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );
  } else {
    return (
      <>
      <QueryClientProvider client={queryClient}>
        <button onClick={signOut}>SignOut</button>
          <div className="base-container">
            <TodoDataContext.Provider value={{queryData, setQueryData}}>
              <TodoInput handleTasks={handleTasks} session={session} />
              <TodoList
                updateTasks={updateTasks}
                deleteTask={deleteTask}
                session={session}
              />
            </TodoDataContext.Provider>
          </div>
          <ReactQueryDevtools/>
      </QueryClientProvider>
      </>
    );
  }
}

export default App;
