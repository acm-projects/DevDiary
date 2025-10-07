import React from "react";
import ContentBox from "./ContentBox";
const ContentContainer = () => {
  {
    /*Content Container */
  }
  return (
    <div className="flex justify-center ml-12.5 ">
      <div className=" fixed w-275 h-45 flex mt-50 ml-[5%] bg-[#D9D9D9]/[0.15] rounded-3xl">
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
