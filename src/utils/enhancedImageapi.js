import axios from "axios";

const API_KEY = "wxtarfdl1ksniac1o";
const API_URL = "https://techhk.aoscdn.com/";

export const enhancedImageURL = async (file) => {
  try {
    const taskId = await uploadImage(file);
   // console.log("Image uploaded successfully, task ID:", taskId);

    const enhancedImage = await poolEnhancedImage(taskId);
   // console.log("Image enhanced successfully, URL:", enhancedImage);

    return enhancedImage;
  } catch (error) {
    console.error("Error enhancing image:", error.message);
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${API_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! Task ID not found.");
  }

 // console.log("Upload response:", data);

  return data.data.task_id;
};

const getEnhancedImage = async (taskId) => {
  const { data } = await axios.get(
    `${API_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );

 // console.log("API Response:", data); //
  if (!data?.data) {
    throw new Error("Invalid API response");
  }
  return data.data;
};

const poolEnhancedImage = async (taskId, flag = 0) => {
  const result = await getEnhancedImage(taskId);

  if (result.progress === 100 && result.state === 1) {
    return result.image;
  }

  if (result.state < 0 || flag >= 10) {
    throw new Error(result.state_detail || "Enhancement failed");
  }

  if ((result.state === 1) & (result.progress === 100)) {
    if (!result.image) {
      throw new Error("Enhanced image URL not found!");
    }
    return result.image;
  }


  console.log(
    `Processing... (State: ${result.state}, Progress: ${result.progress}%)`
  );

  await new Promise((res) => setTimeout(res, 2000));

  return poolEnhancedImage(taskId, flag + 1);
};
