//Should the search return projects or logs within projects or both
//both would be like projects then a sublist of the logs
import { useEffect, useState } from "react";
import '/src/styles/App.css'
import SearchBar from "../components/Search/SearchBar.tsx"
import SearchResultList from "../components/Search/SearchResultList.tsx"
import Logo from "../components/Logo.tsx"
import Dropdown from "../components/Dropdown.tsx"
import TagDropdown from "../components/Tags/TagDropdown.tsx"
import { useLocation } from 'react-router-dom';
import Nav from "../components/NavBar/Nav.tsx"
import type { TagProps } from "../components/Tags/Tag.tsx"

function SearchResults() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchString = params.get('search');
  const [projectFilter, setProjectFilter] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string[]>([]);

  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {

    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/logs", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllLogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setError("Error fetching search results");
        setLoading(false);
      });
  }, []);

  const handleProjectFilterData = (data: string) => {
      setProjectFilter(data);
  };

  const handleTagFilterData = (data: string[]) => {
      setTagFilter(data);
  };
  //TODO: get project names from backend
  const projectNameList = Array.from(new Set(allLogs.map(log => log.project)));
  const tagList = Array.from(new Set(allLogs.map(log => log.tags).flat())).map(tag => ({
    name: tag,
    selected: 0
  }));
  // const tagList: TagProps[] = allLogs.map(log => ({
  //   name: log.,
  //   selected: 0, // or undefined
  // }));
  console.log("tag list");
  console.log(tagList);
  console.log(tagList[0]);

  //TODO: get tags from backend
  //I imagine this will be a list of every tag that has been used on at least one project or log
  // const tagList = [{
  //     name: "Tag 1",
  //     color: "#FF0000",
  //     selected: 0
  //   }, {
  //     name: "Tag 2",
  //     color: "#00FF00",
  //     selected: 0
  //   }, {
  //     name: "Tag 3",
  //     color: "#0000FF",
  //     selected: 0
  //   }, {
  //     name: "Tag 4",
  //     color: "#df09e7",
  //     selected: 0
  //   }]

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-[url(src/assets/gradient2.png)]">
      <div className="sticky top-0 h-screen">
          <Nav />
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
            </div>
            <div className="">
              <TagDropdown
                label="Tag Filter"
                sendDataToParent={handleTagFilterData}
                tags={tagList}
                defaultValue=""
              />
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