import React from "react";

const Upload = () => {
  return (
    <div className="w-full bg-white shadow-2xl rounded-2xl p-5 max-w-xl mt-5 mb-5">
      <label
        htmlFor="fileInput"
        className="block w-full border-2 border-dashed cursor-pointer  border-gray-500 hover:border-blue-500 p-4 rounded-xl text-md font-semibold transition-all text-center"
      >
        <input type="file" id="fileInput" className="hidden"/>
        <span className="text-gray-500">Click to upload your image!</span>
      </label>
    </div>
  );
};

export default Upload;
