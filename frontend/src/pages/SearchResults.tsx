import React, { useState } from 'react';
import '/src/styles/App.css'
import SearchBar from "../components/Search/SearchBar.tsx"
import SearchResultList from "../components/Search/SearchResultList.tsx"
import Dropdown from "../components/Dropdown.tsx"
import TagDropdown from "../components/Tags/TagDropdown.tsx"
import { useLocation } from 'react-router-dom';
import Nav from "../components/NavBar/Nav.tsx"

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
  }];

  return (
    <div className="grid grid-cols-[200px_auto] bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] bg-cover h-screen w-screen text-white font-sans">
      <div className="sticky top-0 h-screen">
        <Nav />
      </div>

      <main className="relative h-screen overflow-y-auto p-8">
        <div className="w-full max-w-6xl mx-auto">
          
          <h1 className="text-4xl font-bold text-white mb-8">Search Results</h1>
                    <div className="w-full max-w-2xl mb-6 mx-auto">
            <SearchBar />
          </div>

          <div className="flex gap-4 mb-10 justify-center">
            <div className="w-64">
              <Dropdown
                label="Project Filter"
                sendDataToParent={handleProjectFilterData}
                options={["No Project", ...projectNameList]}
              />
            </div>
            <div className="w-64">
              <TagDropdown
                label="Tag Filter"
                sendDataToParent={handleTagFilterData}
                tags={tagList}
                defaultValue=""
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Results {searchString ? `for "${searchString}"` : ""}
          </h2>
          <SearchResultList
            query={searchString}
            projectFilter={projectFilter}
            tagFilter={tagFilter} 
          />
        </div>
      </main>
    </div>
  )
}

export default SearchResults;