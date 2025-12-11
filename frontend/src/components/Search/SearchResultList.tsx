import '/src/styles/App.css'
import LogList from "../LogListView/LogList.tsx"
import type { LogProps } from "../LogListView/Log.tsx"
import { useEffect, useState } from "react";

interface SearchResultListProps {
  query: string | null;
  projectFilter: string;
  tagFilter: string[];
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
    title: title,
    description: summary,
    status: status,
    tags: tags,
  }));
  const filteredSearchResults = simplifiedSearchResults.filter(result => {
    const projectMatches = result.project === projectFilter || projectFilter == "" || projectFilter == "No Project";

    const tagMatches = (result.tags.length == 0) ? (true) : 
      result.tags.some((tag: any) => 
        tagFilter.includes(tag) || tagFilter.length == 0
      );

    return projectMatches && tagMatches;
  });
  
  return (
    <div className="z-10">
    <LogList logList={filteredSearchResults} />
    </div>
  )
}

export default SearchResultList;