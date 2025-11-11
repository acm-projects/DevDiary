import "styles/App.css";
import LogList from "../LogListView/LogList.tsx";

interface Tag {
  name: string;
}

type LogProps = {
  id: number;
  name: string;
  project: string;
  description: string;
  status: string;
  tags: Tag[];
}

interface SearchResultListProps {
  query: string | null;
  projectFilter: string;
  tagFilter: string[];
}

function SearchResultList({ query, projectFilter, tagFilter }: SearchResultListProps) {

  //TODO: get search results from backend
  const searchResults = [{
    id: 0,
    name: "Log 1",
    project: "Project 1",
    description: "rfggf...",
    status: "In Progress",
    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }]
  }, {
    id: 1,
    name: "Log 2",
    project: "Project 2",
    description: "description...",
    status: "Completed",

    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }]
  }, {
    id: 2,
    name: "Log 3",
    project: "Project 3",
    description: "description...",
    status: "In Progress",

    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }]
  }, {
    id: 3,
    name: "Log 4",
    project: "Project 4",
    description: "description...",
    status: "In Progress",

    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }, {
      name: "Tag 4",
    }]
  }, {
    id: 4,
    name: "Log 5",
    project: "Project 5",
    description: "description...",
    status: "Completed",

    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }]
  },];

  const filteredSearchResults = searchResults.filter(result => {
    const projectMatches = result.project === projectFilter || projectFilter === "" || projectFilter === "No Project";

    const tagMatches = result.tags.some(tag =>
      tagFilter.includes(tag.name) || tagFilter.length === 0
    );

    return projectMatches && tagMatches;
  });
  
  return (
    <LogList logList={filteredSearchResults} />
  )
}

export default SearchResultList;