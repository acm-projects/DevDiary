//Should the search return projects or logs within projects or both
//both would be like projects then a sublist of the logs
import React, { useState } from 'react';
import '/src/styles/App.css'
import SearchBar from "../components/Search/SearchBar.tsx"
import SearchResultList from "../components/Search/SearchResultList.tsx"
import Logo from "../components/Logo.tsx"
import Dropdown from "../components/Dropdown.tsx"
import TagDropdown from "../components/Tags/TagDropdown.tsx"
import { useLocation } from 'react-router-dom';

function SearchResults() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchString = params.get('search');
  const [projectFilter, setProjectFilter] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string[]>([]);

  const handleProjectFilterData = (data: string) => {
      setProjectFilter(data);
  };

  const handleTagFilterData = (data: string[]) => {
      setTagFilter(data);
  };
  //TODO: get project names from backend
  const projectNameList = [
    "Project 1", "Project 2", "Project 3", "Project 4", "Project 5"
  ]

  //TODO: get tags from backend
  //I imagine this will be a list of every tag that has been used on at least one project or log
  const tagList = [{
      name: "Tag 1",
      color: "#FF0000",
      selected: 0
    }, {
      name: "Tag 2",
      color: "#00FF00",
      selected: 0
    }, {
      name: "Tag 3",
      color: "#0000FF",
      selected: 0
    }, {
      name: "Tag 4",
      color: "#df09e7",
      selected: 0
    }]

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-[url(src/assets/gradient2.png)]">
      <div className="fixed top-[1.5vh] left-[1vw]">
        <Logo/>
      </div>
      <div className="w-full">
        <div className="w-1/2 mx-auto">
          {/* Search Bar */}
          <SearchBar/>

          {/* Dropwdown Filters */}
          <div className="flex justify-center pt-3 space-x-5">
            <div className="">
              <Dropdown
                label="Project Filter"
                sendDataToParent={handleProjectFilterData}
                options={["No Project", ...projectNameList]}
              />
              <p>{projectFilter}</p>
            </div>
            <div className="">
              <TagDropdown
                label="Tag Filter"
                sendDataToParent={handleTagFilterData}
                tags={tagList}
                defaultValue=""
              />
              <p>{tagFilter}</p>
            </div>
          </div>
        </div>

        {/* Search Result List */}
        <div className="w-3/5 mx-auto ">
          <h2 className="font-dm-mono text-xl font-bold text-white text-left pt-10 pb-5">Search Results:</h2>
          <div className="overflow-y-auto max-h-100">
            <SearchResultList 
              query={searchString}
              projectFilter={projectFilter}
              tagFilter={tagFilter}/>
          </div>
        </div>
      </div>
    </div>
  )  
}

export default SearchResults