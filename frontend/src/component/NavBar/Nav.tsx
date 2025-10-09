import React from "react";

const Nav = () => {
  return (
    <>
      <div className="h-full w-[15%] flex justify-left  flex-col items-center space-y-10  relative bg-[#011522] text-white ">
        {/*Logo */}
        <div className="text-xl mt-3 mr-1.5 ">
          <span className="text-[#80FFDB]">{"</>"}</span> DevDiary{" "}
        </div>
        <span className="h-115">
          {/*Quick Log Button*/}
          <button className="bg-[#244F51] bg-opacity-65 w-[175px] h-[38px] ml-1.5 mb-6 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200">
            <span className=" flex items-center justify-center text-[#4BDEB4] ">
              <img src="public\Lightning Bolt.png" alt="" />
              Quick Log
            </span>
          </button>
          {/*Calendar */}
          <a
            href=""
            className=" flex items-left justify-center hover:scale-105 ease-in-out duration-200 text-l mb-6 ">
            <img src="public\Calendar.png" alt="" className="mr-2" />
            Calendar
          </a>
          {/*All Projects */}
          {/*  <a
            href=""
            className=" flex items-left justify-left  hover:scale-105 ease-in-out duration-200 text-l mb-6 ml-2">
            <img src="public\Folder.png" alt="" className="mr-2" />
            All Projects
          </a> */}
          {/*New Log Button*/}
          <div className="flex justify-center mb-5">
            <button className="bg-gradient-to-r from-[#43B5A8] to-[#318CB1] bg-opacity-65 w-[150px] h-[39px] rounded-xl flex justify-center mb-2 hover:scale-105 ease-in-out duration-200">
              <span className="text-3xl">+ </span>
              <span className="text-l mt-2 ml-1 "> New Log</span>
            </button>
          </div>
          {/*New Project Button*/}
          <button className="bg-[#244F51] bg-opacity-20 w-[150px] h-[39px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200">
            New Project
          </button>
        </span>
        {/*Account*/}
        <a
          href=""
          className="flex items-center justify-center  hover:scale-105 ease-in-out duration-200 text-l">
          <img src="public\Profile.png" alt="" />
          Account
        </a>
      </div>
    </>
  );
};

export default Nav;
