import '/src/styles/App.css'
import LogList from "../LogListView/LogList.tsx"

interface SearchResultListProps {
    query: string|null;
    projectFilter: string;
    tagFilter: string[];
}

function SearchResultList({ query, projectFilter, tagFilter }: SearchResultListProps) {

  //TODO: get search results from backend
  //      implement tags as components
  const searchResults = [{
    id: 0,
    name: "Log 1",
    project: "Project 1",
    description: "description...",
    tags: [{
      name: "Tag 1",
      color: "#FF0000",
    }, {
      name: "Tag 2",
      color: "#00FF00",
    }, {
      name: "Tag 3",
      color: "#0000FF",
    }]
  }, {
    id: 1,
    name: "Log 2",
    project: "Project 2",
    description: "description...",
    tags: [{
      name: "Tag 1",
      color: "#FF0000",
    }, {
      name: "Tag 2",
      color: "#00FF00",
    }, {
      name: "Tag 3",
      color: "#0000FF",
    }]
  }, {
    id: 2,
    name: "Log 3",
    project: "Project 3",
    description: "description...",
    tags: [{
      name: "Tag 1",
      color: "#FF0000",
    }, {
      name: "Tag 2",
      color: "#00FF00",
    }, {
      name: "Tag 3",
      color: "#0000FF",
    }]
  }, {
    id: 3,
    name: "Log 4",
    project: "Project 4",
    description: "description...",
    tags: [{
      name: "Tag 1",
      color: "#FF0000",
    }, {
      name: "Tag 2",
      color: "#00FF00",
  }, {
      name: "Tag 3",
      color: "#0000FF",
  }, {
      name: "Tag 4",
      color: "#df09e7",
    }]
  }, {
    id: 4,
    name: "Log 5",
    project: "Project 5",
    description: "description...",
    tags: [{
      name: "Tag 1",
      color: "#FF0000",
  }, {
      name: "Tag 2",
      color: "#00FF00",
  }, {
      name: "Tag 3",
      color: "#0000FF",
    }]
  }, ]

  const filteredSearchResults = searchResults.filter(result => {
    const projectMatches = result.project === projectFilter || projectFilter == "" || projectFilter == "No Project";

    const tagMatches = result.tags.some(tag => 
      tagFilter.includes(tag.name) || tagFilter.length == 0
    );

    return projectMatches && tagMatches;
  });  
  
  return (
    <div>
        <LogList logList={filteredSearchResults}/>
    </div>
  )  
}

export default SearchResultList