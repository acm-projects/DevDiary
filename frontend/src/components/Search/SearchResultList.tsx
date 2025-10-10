import '/src/styles/App.css'
import LogList from "../LogListView/LogList.tsx"

interface SearchResultListProps {
    query: string|null
}

function SearchResultList({ query }: SearchResultListProps) {

  //TODO: get search results from backend
  //      implement tags as components
  const searchResults = [{
    id: 0,
    name: "Project 1",
    description: "description...",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  }, {
    id: 1,
    name: "Project 2",
    description: "description...",
    tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
  }, {
    id: 2,
    name: "Project 3",
    description: "description...",
    tags: ["Tag 1", "Tag 2"],
  }, {
    id: 3,
    name: "Project 4",
    description: "description...",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  }]

  return (
    <div>
        <LogList logList={searchResults}/>
    </div>
  )  
}

export default SearchResultList