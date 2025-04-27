import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.SUPABASE_ANON_KEY

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
export function SupaAuth() {
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
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <button onClick={signOut}>SignOut</button>;
  }
}
