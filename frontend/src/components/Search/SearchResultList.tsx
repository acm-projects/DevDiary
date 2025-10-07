import '/src/styles/App.css'

interface SearchResultListProps {
    queryString: string|null
}

function SearchResultList({ queryString }: SearchResultListProps) {

  //TODO: get search results from backend
  //      implement tags as components
  const searchResults = [{
    id: 0,
    projectName: "Project 1",
    projectDescription: "description...",
    tagList: ["Tag 1", "Tag 2", "Tag 3"],
  }, {
    id: 1,
    projectName: "Project 2",
    projectDescription: "description...",
    tagList: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
  }, {
    id: 2,
    projectName: "Project 3",
    projectDescription: "description...",
    tagList: ["Tag 1", "Tag 2"],
  }, {
    id: 3,
    projectName: "Project 4",
    projectDescription: "description...",
    tagList: ["Tag 1", "Tag 2", "Tag 3"],
  }]

  const results = searchResults.map(result =>
    //TODO make each entry a button that navigates you to the project
    <li key={result.id} className="bg-[#011522]/50 px-3 py-1 h-20 text-white text-lg w-full rounded-lg border-white">
      <div className="text-left flex">
        <h2 className="font-dm-mono">{result.projectName}</h2>
          <div className="flex mx-1">
          {result.tagList.map((item) => (
            <span 
              key={item}
              className="mx-1"
            >
              <p className="text-lg mx-4 font-headvig w-full p-1 text-white text-[14px] text-center leading-6 bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45">
                {item}
              </p>
          </span> 
          ))}
        </div>
      </div>
      <div className="text-left font-headvig">
        {result.projectDescription}
      </div>
    </li>
  );

  return (
    <div>
        <ul className="space-y-5">{results}</ul>
    </div>
  )  
}

export default SearchResultList