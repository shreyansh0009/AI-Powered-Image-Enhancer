import React from "react";
import Preview from "./Preview";
import Upload from "./Upload";
import { useState } from "react";
import { enhancedImageURL } from "../utils/enhancedImageapi";
const Home = () => {
  const [uploadImage, setuploadImage] = useState(null);
  const [enhancedImage, setenhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file) => {
    setuploadImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const enhancedURL = await enhancedImageURL(file);
      setenhancedImage(enhancedURL);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error enhancing image");
    }
  };
  

  return (
    <>
      <Upload handleImageUpload={handleImageUpload} />
      <Preview
        uploaded={uploadImage}
        enhanced={enhancedImage}
        loading={loading}
      />
    </>
  );
};

export default Home;
