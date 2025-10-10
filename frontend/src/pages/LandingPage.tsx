import React from "react";

const LandingPage = () => {
  return (
    // Parent container with snapping properties
    <div className="relative snap-y snap-mandatory h-screen w-screen overflow-y-scroll">
      {/* Section 1 */}
      <div className="snap-always snap-center h-screen w-screen flex  bg-[#011522]  text-white">
        <nav className="flex justify-center items-center">
          <p>__DevDiary</p>
          <ul className="inline-block">
            <li>feature</li>
            <li>about </li>
            <li>Contact</li>
            <button>Log In</button>
            <button>Get Started</button>
          </ul>
        </nav>

        <img
          className=" absolute object-bottom"
          src="public\Desktop - 1.png"
          alt=""
        />
      </div>

      {/* Section 2 */}
      <div className="snap-always snap-center h-screen w-screen flex items-center justify-center bg-[#011522]   text-white">
        <h1 className="text-4xl">Page Two</h1>
      </div>

      {/* Section 3 */}
      <div className="snap-always snap-center h-screen w-screen flex items-center justify-center bg-[#011522]   text-white">
        <h1 className="text-4xl">Page Three</h1>
      </div>

      {/* Section 4 */}
      <div className="snap-always snap-center h-screen w-screen flex items-center justify-center bg-[#011522]   text-white">
        <h1 className="text-4xl">Page 4</h1>
      </div>
    </div>
  );
};

export default LandingPage;
