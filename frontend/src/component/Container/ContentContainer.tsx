import React from "react";
import ContentBox from "./ContentBox";
const ContentContainer = () => {
  {
    /*Content Container */
  }
  return (
    <div className="flex justify-center ml-11 ">
      <div className=" w-250 h-45 flex  bg-[#D9D9D9]/[0.15] rounded-3xl">
        <div className=" w-full h-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll whitespace-nowrap scroll-smooth  ">
          <ContentBox />
          <ContentBox />
          <ContentBox />
          <ContentBox />
          <ContentBox />
          <ContentBox />
          <ContentBox />
          <ContentBox />
        </div>
      </div>
    </div>
  );
};

export default ContentContainer;
