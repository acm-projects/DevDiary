import React from "react";
import { useNavigate, Link } from 'react-router-dom';

const Nav = () => {
      const navigate = useNavigate();

  return (
    <>
      <div className="h-full w-[15%] flex justify-left  flex-col items-center space-y-10  relative bg-[#011522] text-white ">
        <div className="text-xl mt-3 mr-1.5 ">
          <span className="text-[#80FFDB]">{"</>"}</span> DevDiary{" "}
        </div>
        <span className="h-115">
          <button className="bg-[#244F51] bg-opacity-65 w-[195px] h-[38px] ml-1.5 mb-6 mr-1.5 rounded-xl" onClick={() => navigate("/new-log")}>
            <span className=" flex items-center justify-center text-[#4BDEB4] hover:scale-105 ease-in-out duration-200">
              <img src="/Lightning Bolt.png" alt="" />
              Quick Log
            </span>
          </button>
          <a
            href=""
            className=" flex items-left justify-left hover:scale-105 ease-in-out duration-200 text-l mb-4 ml-2">
            <img src="/Calendar.png" alt="" className="mr-2" />
            Calendar
          </a>
          <a
            href=""
            className=" flex items-left justify-left  hover:scale-105 ease-in-out duration-200 text-l mb-6 ml-2">
            <img src="/Folder.png" alt="" className="mr-2" />
            All Projects
          </a>
          <div className="flex justify-center mb-5">
            <button 
              className="bg-gradient-to-r from-[#43B5A8] to-[#318CB1] bg-opacity-65 w-[163px] h-[39px] rounded-xl flex justify-center mb-2 hover:scale-105 ease-in-out duration-200"
              onClick={() => navigate("/new-log")}
            >
              <span className="text-3xl">+ </span>
              <span className="text-l mt-2 ml-1 "> New Log</span>
            </button>
          </div>
          <button 
            className="bg-[#244F51] bg-opacity-20 w-[163px] h-[39px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
            onClick={() => navigate("/new-project")} 
          >
            New Project
          </button>
        </span>
        <Link
          to="/settings"
          className="flex items-center justify-center  hover:scale-105 ease-in-out duration-200 text-l">
          <img src="/Profile.png" alt="" />
          Account
        </Link>
      </div>
    </>
  );
};

export default Nav;
