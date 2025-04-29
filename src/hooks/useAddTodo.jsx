import { useMutation } from "@tanstack/react-query";

import { uploadFile, saveNote } from "../api/api";

export const useUploadFile = () => {
  return useMutation({
    mutationKey: ["upload-file"],
    mutationFn: ({ file, folder }) => uploadFile({ file, folder }),
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useAddTodo = () => {
  return useMutation({
    mutationKey: ["add-todo"],
    mutationFn: ({ inputValue, imageUrl, tag, user_name }) =>
      saveNote({ inputValue, imageUrl, tag, user_name }),
    onError: (err) => {
      console.log(err);
    },
  });
};
