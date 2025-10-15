import Header from "components/Header";
import Logo from "components/Logo";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  return (
    // Parent container with snapping properties
    <div className="relative snap-y snap-mandatory h-screen w-screen overflow-y-scroll ">
      {/* Section 1 */}
      <div className="snap-always h-screen w-full flex flex-col snap-center flex  bg-[#011522]  text-white">
        <div className="w-full flex-row ">
          <div className="items-center border-b py-1  border border-teal-500/30 backdrop-blur-sm  bg-cover  text-white overflow-hidden ">
            <button
              onClick={goToHome}
              className="[font-family:'DM-Mono',Helvetica] font-bold text-[1rem] cursor-pointer flex items-center ">
              <span className="text-[#80ffdbbf]">&lt;/&gt;</span>
              <span className="ml-1 text-white">devDiary</span>
            </button>
            <ul className="flex flex-row justify-end items-around ">
              <li>feature</li>
              <li>about </li>
              <li>Contact</li>
              <button>Log In</button>
              <button>Get Started</button>
            </ul>
          </div>
        </div>

        <div className="flex-grow relative flex items-center justify-center">
          <h1 className="text-5xl font-bold z-10">hello</h1>

          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="public\Desktop - 1.png"
            alt=""
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="snap-always  h-screen w-screen snap-center flex bg-[#011522] text-white">
        max
      </div>

      {/* Section 3 */}
      <div className="snap-always snap-center h-screen w-screen flex items-center justify-center bg-[#011522]   text-white">
        <div>Hello</div>
      </div>

      {/* Section 4 */}
      <div className="snap-always snap-center h-screen w-screen flex items-center justify-center bg-[#011522]   text-white">
        <h1 className="text-4xl">Page 4</h1>
      </div>
    </div>
  );
};

export default LandingPage;
