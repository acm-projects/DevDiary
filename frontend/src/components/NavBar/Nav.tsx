import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const handleNewLog = () => {
    navigate("/new-log");
  };
  const handleNewProject = () => {
    navigate("/new-project");
  };
  return (
    <>
      <div className="h-full flex justify-left  flex-col items-center justify-between relative bg-[#011522] text-white ">
        <div className="text-xl mt-3 mr-1.5 ">
          <span className="text-[#80FFDB]">{"</>"}</span> DevDiary{" "}
        </div>
        <span className="mb-65">
          {/* Quick Log */}
          <button className="bg-[#244F51]  bg-opacity-65 w-[175px] h-[35px] ml-1.5 mb-6 mr-1.5 rounded-xl">
            <span className=" flex items-center justify-center text-[#4BDEB4] hover:scale-105 ease-in-out duration-200">
              <img src="/Lightning Bolt.png" alt="" />
              Quick Log
            </span>
          </button>

          {/* Calendar */}
          <Link
            to=""
            className=" flex  !text-white visited:text-white  items-left justify-left hover:scale-105 ease-in-out duration-200 text-l mb-4 ml-2  ">
            <img src="/Calendar.png" alt="" className="mr-2" />
            Calendar
          </Link>
          
         {/* All Projects  */}
          <Link
            to="/projects"
            className=" flex  !text-white visited:text-white  items-left justify-left hover:scale-105 ease-in-out duration-200 text-l mb-4 ml-2  ">
            <img src="/Folder.png" alt="" className="mr-2" />
            All Projects
          </Link>

          {/* Search Page */}
          <Link
            to="/search"
            className=" flex  !text-white visited:text-white  items-left justify-left hover:scale-105 ease-in-out duration-200 text-l mb-4 ml-2  ">
            <img src="/src/assets/icons/search.png" alt="" className="mr-2" />
            Search
          </Link>

          {/* New Log */}
          {/*bg-gradient-to-r from-[#43B5A8] to-[#318CB1] */}
          <div className="flex justify-center mb-5">
            <button
              onClick={handleNewLog}
              className=" text-[#4BDEB4] bg-gradient-to-r from-teal-300 via-teal-500 to-cyan-500 bg-opacity-60 w-[155px] h-[35px] rounded-xl flex justify-center items-center mb-2 hover:scale-105 ease-in-out duration-200">
              <span className="text-3xl mb-1">+ </span>
              <span className="text-l ml-1 "> New Log</span>
            </button>
          </div>

          {/* New Project */}
          <button
            onClick={handleNewProject}
            className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200">
            New Project
          </button>
        </span>

        {/* Account*/}
        <Link
          to={"/settings"}
          className="flex mb-2 items-center hover:scale-105 ease-in-out duration-200 text-l  !text-white visited:text-white  ">
          <img src="Profile.png" alt="" />
          Account
        </Link>
      </div>
    </>
  );
};

export default Nav;
