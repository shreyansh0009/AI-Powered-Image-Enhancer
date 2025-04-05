import React from "react";
import "./App.css";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="w-full h-screen bg-zinc-200 flex flex-col items-center justify-center  py-5 px-8">
      <h1 className="text-5xl font-extrabold font-sans p-2">AI Image Enhancer</h1>
      <p className="text-md pb-2">Upload you image and let AI enhance it!</p>
      <Home />
      Footer
    </div>
  );
};

export default App;
