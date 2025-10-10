import React from "react";
import "/src/styles/Home.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
const Home = () => {
  return (
    <>
      <div className=" absolute h-full inset-0 bg-[#011522] max-h-screen">
        <div className=" absolute h-full w-full bg-[url('/Variant5.png')]  bg-center bg-cover"></div>
        <div className="h-full w-full grid grid-cols-15 grid-rows-10">
          {/* Nav Bar */}
          <div className="col-start-1 col-span-2 row-span-10">
            <Nav />
          </div>
          <div className=" col-start-3 col-span-3 text-2xl text-white justify-self-start ml-5 mt-3">
            Welcome Back, User!
          </div>
          <div className="row-start-2 col-start-5 col-span-8 ">
            {" "}
            <form className="w-full">
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
                  className="block w-full p-2.5 ps-10 text-sm opacity-75 rounded-xl bg-[#011522] dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
          <div className="  ml-15  row-start-3 col-start-3 col-span-12 row-span-3">
            <div className="text-2xl text-left ml-1 mb-3 text-white">
              Jump Back In
            </div>
            <ContentContainer />
          </div>
          <div className="  ml-15 row-start-7 col-start-3 col-span-12 row-span-3">
            <div className="text-2xl text-left ml-1 mb-3 text-white">
              Template
            </div>
            <ContentContainer />
          </div>
          <div className="  ml-15 row-start-11 col-start-3 col-span-12 row-span-3">
            <div className="text-2xl text-left ml-1 mb-3 text-white">
              Template
            </div>
            <ContentContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
