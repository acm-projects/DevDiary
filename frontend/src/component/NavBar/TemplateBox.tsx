import React from "react";

const TemplateBox = () => {
  return (
    <div className="flex">
      <div
        className=" absolute inset-0 scroll-ms-6 bg-[#D9D9D9] opacity-15 w-255 h-45 rounded-3xl mt-45 ml-[17.5%] justify-center"
        overflow-x-auto>
        <div className=" h-35 w-2 bg-black">hello</div>
      </div>
      <div className=" absolute inset-0 bg-[#D9D9D9] opacity-15 w-255 h-45 rounded-3xl mt-100 ml-[17.5%] justify-center">
        <div className="relative "> hello</div>
      </div>
    </div>
  );
};

export default TemplateBox;
