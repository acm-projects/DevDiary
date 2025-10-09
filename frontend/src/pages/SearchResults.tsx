//Should the search return projects or logs within projects or both
//both would be like projects then a sublist of the logs

import '/src/styles/App.css'
import SearchBar from "../components/Search/SearchBar.tsx"
import SearchResultList from "../components/Search/SearchResultList.tsx"
import Logo from "../components/Logo.tsx"
import { useLocation } from 'react-router-dom';

function SearchResults() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchString = params.get('search');

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-[url(src/assets/gradient2.png)]">
      <div className="fixed top-[1.5vh] left-[1vw]">
        <Logo/>
      </div>
      <div className="w-full">
        <div className="w-1/2 mx-auto">
          <SearchBar/>
        </div>

        <div className="w-4/5 mx-auto">
          <h2 className="font-dm-mono text-xl font-bold text-white text-left pt-10 pb-5">Search Results:</h2>
          <SearchResultList query={searchString}/>
        </div>
      </div>
    </div>
  )  
}

export default SearchResults