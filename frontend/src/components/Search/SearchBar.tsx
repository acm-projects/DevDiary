import { type FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '/src/styles/App.css'

function SearchBar() {

  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    console.log(query);
    setQuery("")
    navigate('/search?search=' + query);
  }
  return (
    <div className="w-full">
      <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="relative bg-[#011522]/80 border border-teal-500/30 rounded-full backdrop-blur-sm transition-colors duration-300 focus-within:border-teal-400 focus-within:shadow-[0px_20px_80px_-20px_#41cca6]">

          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <input
            type="search"
            className="block w-full p-4 pl-12 text-lg bg-transparent rounded-full focus:ring-0 focus:outline-none text-white placeholder-gray-400"
            placeholder="Search logs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar