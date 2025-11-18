import '/src/styles/App.css'
import LogList from "../LogListView/LogList.tsx"
import type { LogProps } from "../LogListView/Log.tsx"
import { useEffect, useState } from "react";

interface SearchResultListProps {
<<<<<<< HEAD
  query: string | null;
  projectFilter: string;
  tagFilter: string[];
=======
    query: string|null;
    projectFilter: string;
    tagFilter: string[];
>>>>>>> routed-pages
}
// type logSchema = {
//         _id: string,
//         title: string,
//         content: string,
//         tags: string[],
//         summary: string,
//         explanation: string,
//         similar_logs: number,
//         embedding: number[],
//         timestamps: true  // createdAt, updatedAt
//     }

function SearchResultList({ query, projectFilter, tagFilter }: SearchResultListProps) {
<<<<<<< HEAD
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchContent: query }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setError("Error fetching search results");
        setLoading(false);
      });
  }, [query]);

  const simplifiedSearchResults = searchResults.map(({ _id, title, project, summary, status, tags }) => ({
    id: _id,
    project: project,
    name: title,
    description: summary,
    status: status,
    tags: tags.map((tag: any) => ({ name: tag })),
  }));


  const filteredSearchResults = simplifiedSearchResults.filter(result => {
    const projectMatches = result.project === projectFilter || projectFilter == "" || projectFilter == "No Project";

    const tagMatches = result.tags.some((tag: any) => 
=======

  //TODO: get search results from backend
  //      implement tags as components
  const searchResults = [{
    id: 0,
    name: "Log 1",
    project: "Project 1",
    description: "rfggfdfghgfdsdfghgfdsdfghgfdsadfghgfdsasdfghgfdsasdfghgdsdfghgfds...",
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
>>>>>>> routed-pages
      tagFilter.includes(tag.name) || tagFilter.length == 0
    );

    return projectMatches && tagMatches;
<<<<<<< HEAD
  });
  
  return (
    <LogList logList={filteredSearchResults} />
  )
=======
  });  
  
  return (
    <div>
        <LogList logList={filteredSearchResults}/>
    </div>
  )  
>>>>>>> routed-pages
}

export default SearchResultList;