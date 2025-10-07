import '/src/styles/App.css'
import SearchBar from "../components/SearchBar.tsx"
import SearchResultList from "../components/SearchResultList.tsx"
import Logo from "../components/Logo.tsx"
import { useLocation } from 'react-router-dom';

function SearchResults() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchString = params.get('search');

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-[url(src/assets/background.png)]">
      <div className="fixed top-[1.5vh] left-[1vw]">
        <Logo/>
      </div>
      <div>
        <h2 className="font-dm-mono text-4xl font-bold text-white text-center m-5">Search Results</h2>


        <div className="px-30 py-5 space-y-5">
          <div className="w-xl">
            <SearchBar/>
          </div>
          <div className="w-xl">
            <SearchResultList queryString={searchString}/>
          </div>
        </div>
      </div>
    </div>
  )  
}

export default SearchResults