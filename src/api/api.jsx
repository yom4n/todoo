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


export const deleteFileFromUrl = async ({publicUrl}) => {
    const bucketName = 'mediaa'; // Replace with your actual bucket name
    console.log(publicUrl)
    console.log(typeof(publicUrl))
    // Extract the file path from the public URL
    const urlParts = publicUrl.split(`${bucketName}/`);
    const filePath = urlParts[1];
  
    if (!filePath) throw new Error('Invalid URL or bucket name.');
  
    const { error } = await supabase
      .storage
      .from(bucketName)
      .remove([filePath]);
  
    if (error) throw new Error(`Storage file deletion failed: ${error.message}`);
  };
  

export const deleteNote = async ({id}) => {
    const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Database row deletion failed: ${error.message}`);
  }
  return data;

}