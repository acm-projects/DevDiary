import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/Home.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(query);
    navigate("/search?search=" + query);
  }

  return (
    <>
      <div className=" grid grid-cols-[200px_auto] bg-[#011522] h-screen">
        {/* Nav Bar */}
        <div className="sticky top-0 h-screen">
          <Nav />
        </div>
        <div className=" relative overflow-y-auto bg-[url('/Variant5.png')] bg-center bg-cover">
          <div className=" w-full min-h-screen grid grid-cols-15 grid-rows-15">
            <div className=" col-start-1 col-span-4 text-2xl text-white justify-self-start ml-5 mt-3">
              Welcome Back, User!
            </div>
            {/* search Bar */}
            <div className="row-start-2 col-start-3 col-end-7">
              {" "}
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 ">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-[250%] p-2.75 ps-10 text-sm opacity-75 rounded-xl bg-[#011522] dark:placeholder-gray-400 dark:text-white  "
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="  ml-15 row-start-3 col-start-1 col-span-14 row-span-3">
              <div className="text-2xl text-left ml-1 mb-3 text-white">
                Jump Back In
              </div>
              <ContentContainer />
            </div>
            <div className="  ml-15 mb-1.5 row-start-6 col-start-1 col-span-14 row-span-3">
              <div className="text-2xl text-left ml-1 mb-4.5 text-white">
                Template
              </div>
              <ContentContainer />
            </div>
            <div className="  ml-15 mt-1.5 row-start-9 col-start-1 col-span-14 row-span-3">
              <div className="text-2xl text-left ml-1 mb-4.5 text-white">
                Current Projects
              </div>
              <ContentContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
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
          {/* 
         All Projects 
          <Link
            to=""
            className=" flex items-left justify-left  hover:scale-105 ease-in-out duration-200 text-l mb-6 ml-2">
            <img src="/Folder.png" alt="" className="mr-2" />
            All Projects
          </Link>
 */}
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
          <img src="public\Profile.png" alt="" />
          Account
        </Link>
      </div>
    </>
  );
};

export default Nav;
