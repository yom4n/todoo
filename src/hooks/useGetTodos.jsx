import { useQuery } from "@tanstack/react-query";

import { supabase } from "../supabaseClient";

const fetchTodos = async (session) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_name", session?.user?.user_metadata?.name);
  return data;
};

export const useGetTodos = ({ session }) => {
  return useQuery({
    queryKey: ["user-todos"],
    queryFn: () => fetchTodos(session),
  });
};
