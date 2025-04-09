import React from "react";

const Preview = (props) => {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-5xl">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-700 text-white">
          Original Image
        </h2>

        {props.uploaded ? (
          <img
            src={props.uploaded}
            alt=""
            className="w-full max-h-xl object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-300">
            No image selected!
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-emerald-500 text-white">
          Enhanced Image
        </h2>
        {props.enhanced && !props.loading ? (
          <img src="" alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-300">
            No image selected!
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
