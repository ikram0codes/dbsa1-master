import React from "react";

const Loader = () => {
  return (
    <div className="w-full fixed bg-white gap-4 left-0 top-0 h-screen font-bold flex justify-center items-center text-7xl z-[2000]">
      <h1 className="d text-gray">D</h1>
      <h1 className="b text-black">B</h1>
      <h1 className="s text-gray">S</h1>
      <h1 className="a text-black">A</h1>
    </div>
  );
};

export default Loader;
