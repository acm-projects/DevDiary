import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/App.css";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(query);
    setQuery("");
    navigate("/search?search=" + query);
  }
  return (
    <div className="w-full">
      <form
        className="flex justify-end items-center relative"
        onSubmit={handleSubmit}>
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
          className="bg-[#011522] font-dm-mono px-3 py-1 placeholder-gray-400 placeholder:font-dm-mono text-white text-lg w-full rounded-lg border-white pl-10"
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
export default SearchBar;
