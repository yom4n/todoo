import { useMutation } from "@tanstack/react-query";
import { deleteFileFromUrl, deleteNote } from "../api/api";

export const useDeleteFile = ({ queryClient, imageUrl }) => {
  return useMutation({
    mutationKey: ["delete-file"],
    mutationFn: () => {
        deleteFileFromUrl({publicUrl: imageUrl})
;
    },
    onSuccess: ()=> {queryClient.invalidateQueries(["user-todos"]);}
  });
};

export const useDeleteTodo = ({ queryClient, imageUrl }) => {
  const {mutate} = useDeleteFile({ queryClient, imageUrl })
  return useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: ({ id }) => {
      deleteNote({ id });
    },
    onError: (err) => {
      throw new Error(`Database row deletion failed: ${err.message}`);
    },
    onSuccess: () => {
        mutate({imageUrl})
    },
  });
};
