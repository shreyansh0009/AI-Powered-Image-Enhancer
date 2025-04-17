import React, { useState } from "react";
import Loading from "./Loading";
import { FaDownload } from "react-icons/fa";

const Preview = (props) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (!props.enhanced) return;

    const link = document.createElement("a");
    link.href = props.enhanced;

    const filename =
      props.enhanced.split("/").pop().split("?")[0] || "enhanced-image.jpg";
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 1000);
  };

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

      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-auto">
        <h2 className="text-xl font-semibold text-center bg-emerald-500 text-white">
          Enhanced Image
        </h2>

        {props.enhanced && !props.loading && (
          <>
            <img
              src={props.enhanced}
              alt="Enhanced Image"
              className="w-full max-h-[700px] object-contain"
            />
            <div className="p-4 flex justify-center mt-auto">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center gap-1 hover:cursor-pointer"
              >
                <FaDownload className="h-5 w-5" />
                {isDownloading ? "Downloading..." : "Download Enhanced Image"}
              </button>
            </div>
          </>
        )}

        {props.loading ? (
          <Loading />
        ) : (
          !props.enhanced && (
            <div className="flex items-center justify-center h-80 bg-gray-300">
              No Enhanced image!
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Preview;
