import { supabase } from "../supabaseClient";

export const uploadFile = async ({file, folder}) => {
  const { data, error } = await supabase.storage
    .from("mediaa")
    .upload(`${folder}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });
  console.log(12334);

  if (error) {
    throw new Error(`Database insert failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("mediaa")
    .getPublicUrl(`${folder}/${file.name}`);

  return publicUrlData.publicUrl;
};

export const saveNote = async ({ inputValue, imageUrl, tag, user_name }) => {
  const { data, error } = await supabase.from("notes").insert([
    {
      todo: inputValue,
      user_name: user_name,
      image_url: imageUrl,
      tag: tag,
    },
  ]);
  if (error) {
    throw new Error(`Database insert failed: ${error.message}`);
  }
  return data;
};
