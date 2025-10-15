import React, {type FormEvent, useState} from "react";
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
        <div className=" relative overflow-y-auto bg-[url('src/assets/Variant5.png')] bg-center bg-cover">
          <div className=" w-full min-h-screen grid grid-cols-15 grid-rows-15">
            <div className=" col-start-1 col-span-4 text-2xl text-white justify-self-start ml-5 mt-3">
              Welcome Back, User!
            </div> 
            
            <Link to="/view-log">View</Link> |{" "}

            {/* search Bar */}
            <div className="row-start-2 col-start-3 col-end-7">
              {" "}
              <form className="w-full"     onSubmit={handleSubmit}>
                
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