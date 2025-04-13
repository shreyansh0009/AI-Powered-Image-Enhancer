import axios from "axios";

const API_KEY = "wx8yaiud0xkrjpaog";
const API_URL = "https://techhk.aoscdn.com/";

export const enhancedImageURL = async (file) => {
  try {
    const taskId = await uploadImage(file);
    console.log("Image uploaded successfully, task ID:", taskId);

    const enhancedImage = await poolEnhancedImage(taskId);
    console.log("Image enhanced successfully, URL:", enhancedImage);

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

  console.log("Upload response:", data);

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

  if (!data?.data) {
    throw new Error("Failed to fetch enhanced image!");
  }

  return data.data;
};

const poolEnhancedImage = async (taskId, flag = 0) => {
  const result = await getEnhancedImage(taskId);

  if (result.state === 4) {
    console.log("Processing....");

    if (flag >= 10) {
      throw new error("Max retries reached! Please try again later.");
    }

    await new Promise((res) => setTimeout(res, 2000));

    return poolEnhancedImage(taskId, flag + 1);
  }
  console.log("Enhanced Image URL: ", result);
  return result.data.image;
};

// Object { status: 200, message: "success", data: {…} }
// ​
// data: Object { task_id: "9b025769-e82b-4ce5-b1fe-19cb51421321" }
// ​
// message: "success"
// ​
// status: 200
