import { useMutation } from "@tanstack/react-query";

import { uploadFile, saveNote } from "../api/api";

export const useUploadFile = () => {
  return useMutation({
    mutationKey: ["upload-file"],
    mutationFn: ({ file, folder }) => uploadFile({ file, folder }),
    onError: (err) => {
      throw new Error(`Storage file upload failed: ${err.message}`);
    },
  });
};

export const useAddTodo = () => {
  return useMutation({
    mutationKey: ["add-todo"],
    mutationFn: ({ inputValue, imageUrl, tag, user_name }) =>
      saveNote({ inputValue, imageUrl, tag, user_name }),
    onError: (err) => {
      throw new Error(`Database row addition failed: ${err.message}`);
    },
  });
};
