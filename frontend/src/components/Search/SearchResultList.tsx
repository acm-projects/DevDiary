import '/src/styles/App.css'
import LogList from "../LogListView/LogList.tsx"
import { useEffect, useState } from "react";

interface SearchResultListProps {
    query: string|null
}

function SearchResultList({ query }: SearchResultListProps) {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  //TODO: get search results from backend
  //      implement tags as components
  // const searchResults = [{
  //   id: 0,
  //   name: "Project 1",
  //   description: "description...",
  //   tags: ["Tag 1", "Tag 2", "Tag 3"],
  // }, {
  //   id: 1,
  //   name: "Project 2",
  //   description: "description...",
  //   tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
  // }, {
  //   id: 2,
  //   name: "Project 3",
  //   description: "description...",
  //   tags: ["Tag 1", "Tag 2"],
  // }, {
  //   id: 3,
  //   name: "Project 4",
  //   description: "description...",
  //   tags: ["Tag 1", "Tag 2", "Tag 3"],
  // }]

  return (
    <div>
        <LogList logList={searchResults}/>
    </div>
  )  
}

export default SearchResultList