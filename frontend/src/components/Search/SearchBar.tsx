import '/src/styles/App.css'
import SearchIcon from "/src/assets/icons/search.png"

function SearchBar() {
    return (
        <div className="">
            <form className="flex justify-end items-center relative">
                <input
                    className="bg-[#011522] px-3 py-1 placeholder-gray-400 placeholder:font-headvig font-headvig text-white text-lg w-full rounded-lg border-white pl-10"
                    type="text" 
                    id="search" 
                    name="search" 
                    placeholder="Search..."
                />
                <img className="absolute mr-136" src={SearchIcon}/>
            </form>
        </div>
    );
}

export default SearchBar