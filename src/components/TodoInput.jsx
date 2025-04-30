import { useState, useContext } from "react";
import { FaRegImage } from "react-icons/fa6";
import { LuAudioLines } from "react-icons/lu";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";

import { supabase } from "../supabaseClient";

import { ReactMediaRecorder } from "react-media-recorder";
import { useUploadFile, useAddTodo } from "../hooks/useAddTodo";
import { TodoDataContext } from "../Context";
import { useGetTodos } from "../hooks/useGetTodos";
import { useEffect } from "react";

function TodoInput(props) {
  const [inputValue, setInputValue] = useState(``);
  const [tag, setTag] = useState(false);
  const [recievedFile, setRecievedFile] = useState({});
  const { queryData, setQueryData } = useContext(TodoDataContext);

  const {
    mutate: uploadFile,
    data: imageData,
    isSuccess: fileUploadStatus,
  } = useUploadFile();
  const { mutate: saveNote } = useAddTodo();

  const { getInputProps, getRootProps, open } = useDropzone({
    noClick: true,
    onClick: true,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg", ".svg", ".webp", ".gif"],
    },
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        console.log(file);
        setRecievedFile(file);
      }
    },
  });

  return (
    <div className="input-container">
      <label className="textarea-container">
        <textarea
          rows={1}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        <span className="placeholder">Enter todo</span>
      </label>
      {/* <button></button> */}
      <div className="input-buttons">
        <button className="voice-button">
          <LuAudioLines className="icon-voice" />
        </button>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <button className="image-button" onClick={open}>
            <FaRegImage className="icon-image" />
          </button>
        </div>

        <button
          className="add-button"
          onClick={(e) => {
            props.handleTasks(inputValue);
            console.log(recievedFile);

            uploadFile(
              {
                folder: props.session?.user?.email,
                file: recievedFile,
              },
              {
                onSuccess: (data) =>
                  saveNote(
                    {
                      inputValue,
                      imageUrl: data,
                      tag,
                      user_name: props.session?.user?.user_metadata?.full_name,
                    },
                    {
                      onSuccess: () => {
                        const { data: fetchedOnPostData, isSuccess } =
                          useGetTodos({
                            session: props.session,
                          });
                        useEffect(() => {
                          setQueryData(fetchedOnPostData);
                        }, [isSuccess]);
                      },
                    }
                  ),
              }
            );
            console.log(imageData);
            console.log(fileUploadStatus);
            if (fileUploadStatus) {
              // saveNote({ inputValue, imageUrl, tag, user_name });
              console.log(imageData);
              console.log(fileUploadStatus);
            }

            setInputValue(``);

            //setting the textarea height to auto
            e.target.parentElement.parentElement.firstChild.firstChild.style.height =
              "auto";
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoInput;
