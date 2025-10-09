import React, {type FormEvent, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "/src/styles/Home.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
const Home = () => {

  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    console.log(query);
    navigate('/search?search='); 
  }


  return (
    <>
      <div className=" absolute inset-0 bg-[#011522] max-h-screen">
        <div className=" absolute inset-0 -10 bg-[url('/Variant5.png')] bg-no-repeat bg-center bg-cover flex">
          {/* nav bar */}
          <Nav />
          <div className=" w-fit flex text-2xl ml-[2.5%] mt-[1.5%] text-white inset-0  ">
            Welcome Back, User!
          </div>
          {/* search bar */}
          <form className="max-w-md mt-[7.5%]"
            onSubmit={handleSubmit}>
            {/*     <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label> */}
            <div className="relative ml-[-30%] mt-[-5%]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                onChange= {(e) => setQuery(e.target.value)}                
                required
              />
            </div>
          </form>
          <ContentContainer />
        </div>
      </div>
    </>
  );
};

export default Home;