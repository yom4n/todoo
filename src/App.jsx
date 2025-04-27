import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useEffect } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZXpnenNlZWZ4Z212eXR1aWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1Njk3MjYsImV4cCI6MjA2MTE0NTcyNn0.onq8zJBVJknGO_kT7Lke3_CQyCM0AqwOoI7Fc8iuhwc');

const queryClient = new QueryClient()

function App() {


  const [tasks, setTasks] = useState(() => {
    const storedList = localStorage.getItem("tasks");
    return storedList ? JSON.parse(storedList) : [];
  });

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
    setTasks([...tasks, inputValue]);
  };
  const updateTasks = (editInputValue, identifier) => {
    // * map creates a completely new array so the array referrence also changes

    setTasks(
      tasks.map((task, index) => {
        if (index == identifier) {
          return editInputValue;
        }
        return task;
      })
    );
  };

  const deleteTask = (identifier) => {
    // * splice is note recommended as it mutates the array and react only rerenders when a new array is passed
    // * i.e. array reference is changed
    let newTasks = [...tasks];
    newTasks.splice(identifier, 1);
    setTasks(newTasks);
    console.log(tasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
            <TodoInput handleTasks={handleTasks} session={session} supabase={supabase} />
            <TodoList
              tasks={tasks}
              updateTasks={updateTasks}
              deleteTask={deleteTask}
            />
          </div>
      </QueryClientProvider>
      </>
    );
  }
}

export default App;
