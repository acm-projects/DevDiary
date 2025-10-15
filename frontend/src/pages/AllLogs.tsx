//Page to view all logs within project
//TODO: Add sidebar to display project info

import '/src/styles/App.css'
import Logo from "../components/Logo.tsx"
import LogList from "../components/LogListView/LogList.tsx"
import { useState, useEffect } from 'react'

function AllLogs() {

  //TODO: Get list of logs within project from backend
  const [logList, setLogList] = useState([
    {
      id: 0,
      name: "Log 1",
      description: "description...",
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    }
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/api/logs')
      .then(response => response.json())
      .then(data => {
        setLogList(data); 
        console.log("Fetched logs:", data);
      })
      .catch(error => {
        console.error("Error fetching logs:", error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-[url(src/assets/background.png)]">
      <div className="fixed top-[1.5vh] left-[1vw]">
        <Logo/>
      </div>
      <div className="w-full">
        <h2 className="font-dm-mono text-4xl font-bold text-white text-center m-5">Log List</h2>


        <div className="w-4/5 mx-auto">
            <LogList logList={logList}/>
        </div>
      </div>
    </div>
  )  
}

export default AllLogs