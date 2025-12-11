import React from "react";
import ContentBox from "./ContentBox";
const ContentContainer = () => {
  {
    /*Content Container */
  }
  return (
    //TODO: MAKE INFINITE
    <div className=" w-full  shadow-xl flex justify-center  bg-[#D9D9D9]/[0.15] rounded-3xl">
      <div className=" w-full h-full flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll whitespace-nowrap scroll-smooth  ">
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
  );
};

export default ContentContainer;
