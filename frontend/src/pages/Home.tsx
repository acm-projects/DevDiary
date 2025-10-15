import React, { type FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "/src/styles/Home.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
import SearchResultList from "components/Search/SearchResultList.tsx";
import SearchBar from "components/Search/SearchBar.tsx";
import LogList from "components/LogListView/LogList.tsx";
const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(query);
    navigate("/search?search=" + query);
  }
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchString = params.get("search");
  const handleNewLog = () => {
    navigate("/new-log");
  };

  const logList = [
    {
      id: 0,
      name: "Log 1",
      description: "description...",
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },
    {
      id: 1,
      name: "Log 2",
      description: "description...",
      tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
    },
    {
      id: 2,
      name: "Log 3",
      description: "description...",
      tags: ["Tag 1", "Tag 2"],
    },
    {
      id: 3,
      name: "Log 4",
      description: "description...",
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },
    {
      id: 3,
      name: "Log 4",
      description: "description...",
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },
  ];

  return (
    <>
      <div className=" grid grid-cols-[200px_auto] bg-[#011522] bg-[url(src/assets/gradient2.png)] bg-cover bg-no-repeat h-screen w-screen">
        {/* Nav Bar */}
        <div className="sticky top-0 h-screen">
          <Nav />
        </div>
        <div className="relative snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden ">
          {/* Section 1 */}
          <div className="snap-always snap-center flex  text-white">
            <div className=" h-lvh flex flex-col w-screen  grid grid-cols-15 grid-rows-15">
              <div className="bg-[#011522] text-white rounded-2xl  h-full w-full row-start-3 row-span-4 col-start-2 col-span-13 flex items-center border border-teal-500/30 backdrop-blur-sm ">
                <div className="bg-[url('/Variant5.png')] rounded-2xl  h-full w-full row-start-3 row-span-4 col-start-2 col-end-15 flex items-center justify-around bg-no-repeat bg-cover shadow-[0px_30px_100px_-40px_#41cca6] ">
                  {/*shadow-[0px_0px_50px_5px_#41cca6] */}
                  <span className="md:text-4xl">Welcome Back, User!</span>
                  <div className="flex">
                    <button
                      onClick={handleNewLog}
                      className=" text-[#4BDEB4] bg-gradient-to-r from-teal-400 to-cyan-600  bg-opacity-60 md:w-[120px] md:h-[30px] lg:w-[130px] lg:h-[30px] xl:w-[140px] xl:h-[45px] 2xl:w-[160px] 2xl:h-[55px] rounded-xl flex justify-center items-center mb hover:scale-105 ease-in-out duration-200">
                      <span className="text-3xl mb-1">+ </span>
                      <span className="text-l ml-1 "> New Log</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* search Bar */}
              <div className="grid row-start-10 row-end-11 col-start-4 col-end-13 ">
                {" "}
                <form className="h-full w-full" onSubmit={handleSubmit}>
                  <div className=" relative h-full w-full ">
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
                      className="block w-full h-full  border border-teal-500/30 p-2.75 ps-10 text-xl opacity-75 rounded-4xl bg-[#011522] dark:placeholder-gray-400 dark:text-white   "
                      placeholder="Search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Section 2 */}
          <div className="snap-always snap-center h-screen w-screen flex flex flex-col grid grid-cols-15 grid-rows-15 items-center justify-around   text-white">
            {/*   <div className="flex items-center justify-center w-screen h-screen "></div> */}

            <main className="  h-full row-start-2 row-span-13 col-start-2 col-span-10 bg-[#011522]/60 rounded-xl border border-teal-500/30 p-6 flex flex-col ">
              <div className="w-full">
                <div className="w-1/2 mx-auto">
                  <SearchBar />
                </div>
              </div>
              <div className="w-4/5 mx-auto flex-1 flex flex-col flex-1 min-h-0">
                <h2 className=" text-xl font-semibold text-white text-left pt-5 pb-5">
                  Search Results:
                </h2>
                <div className="overflow-y-scroll ">
                  <LogList logList={logList} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
