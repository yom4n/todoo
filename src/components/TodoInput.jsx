import React from "react";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { LuAudioLines } from "react-icons/lu";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";

import { ReactMediaRecorder } from "react-media-recorder";

function TodoInput(props) {
  const [inputValue, setInputValue] = useState(``);
  const [tag, setTag] = useState(false);

  // const { mutate } = useMutation({
  //   mutationFn: async (file, folder) => {
  //     const { data, error } = await supabase.storage
  //       .from("media")
  //       .upload(`${folder}/${file.name}`, file, {
  //         cacheControl: "3600",
  //         upsert: false,
  //       });
  //       console.log(data)
  //     if(error){return error}
  //     const { data: publicUrlData } = supabase.storage
  //       .from("media")
  //       .getPublicUrl(`${folder}/${file.name}`);
  //     return data
  //   },
  // });
  const uploadFile = async (file, folder) => {
    const { data, error } = await props.supabase.storage
      .from("mediaa")
      .upload(`${folder}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    console.log(12334);

    if (error) throw error;

    const { data: publicUrlData } = props.supabase.storage
      .from("mediaa")
      .getPublicUrl(`${folder}/${file.name}`);

    return publicUrlData.publicUrl;
  };

  const saveNote = async ({ inputValue, imageUrl, tag, user_name }) => {
    try {
      const { data, error } = await props.supabase.from("notes").insert([
        {
          todo: inputValue,
          user_name: user_name,
          image_url: imageUrl,
          tag: tag,
        },
      ]);
      console.log(error) 
    } catch (error) {console.log(error)}
  };

  const { getInputProps, getRootProps, open } = useDropzone({
    noClick: true,
    onClick: true,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg", ".svg", ".webp", ".gif"],
    },
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        console.log(file);
        const imageUrl = await uploadFile(file, props.session?.user?.email);
        saveNote({ inputValue, imageUrl, tag, user_name: props.session?.user?.user_metadata?.name });
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
