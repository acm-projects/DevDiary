//Page to view all logs within project
//TODO: Add sidebar to display project info

import '/src/styles/App.css'
import Logo from "../components/Logo.tsx"
import LogList from "../components/LogListView/LogList.tsx"
import { useParams } from "react-router-dom";
import React, {type FormEvent, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "/src/styles/Projects.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
import SearchBar from "../components/Search/SearchBar.tsx";
import Project from "../components/Projects/Project.tsx";
import { useLocation } from 'react-router-dom';

function AllLogs() {
  const { projectId } = useParams<{ projectId: string }>();

//   TODO: Get list of logs within project from backend


  const [project, setProject] = useState<any>();
  const [logList, setLogList] = useState<any[]>([]);
  const [loadingRecentLogs, setLoadingRecentLogs] = useState<boolean>(true);
  const [errorRecentLogs, setErrorRecentLogs] = useState<string | null>(null);
  
  useEffect(() => {

    setLoadingRecentLogs(true);
    setErrorRecentLogs(null);

    fetch("http://localhost:5000/api/projects/"+projectId, {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(async (data) => {
      setProject(data);
      setLoadingRecentLogs(false);
      console.log(data);


      const logPromises = data.logs.map((logId: string) =>
        fetch(`http://localhost:5000/api/logs/${logId}`)
          .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch log ${logId}`);
            return res.json();
          })
          .catch((err) => {
            console.error(`Error fetching log ${logId}:`, err);
            return null; // Return null so Promise.all doesn’t reject
          })
      );

      // Wait for all logs to be fetched
      const logList = await Promise.all(logPromises);

      // Filter out any null responses
      const validLogs = logList.filter((log) => log !== null);

      const filteredLogList = validLogs.map(({ _id, title, project, summary, tags }) => ({
        id: _id,
        project: project,
        name: title,
        status: "test",
        description: summary,
        tags: tags.map((tag: any) => ({name: tag})),
        
      }))
      setLogList(filteredLogList); // Assuming you have a state variable for this
      console.log(filteredLogList);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
      setErrorRecentLogs("Error fetching search results");
      setLoadingRecentLogs(false);
    });
  }, []);
  
    // const logList = project.logs.map(({ _id, title, project, summary, tags }) => ({
    //     id: _id,
    //     project: project,
    //     name: title,
    //     status: "test",
    //     description: summary,
    //     tags: tags.map((tag: any) => ({name: tag})),
        
    //   }));


  return (
    <div className="flex bg-[#011522] h-screen w-screen">
        {/* Nav Bar */}
        <div className="sticky top-0 h-screen">
            <Nav />
        </div>

        <div className=" relative overflow-y-auto bg-[url('/Variant5.png')] bg-center bg-cover w-full">
            <div className="w-4/5 mx-auto flex flex-col flex-1 min-h-0">
                <h2 className=" text-4xl font-semibold text-white text-center pt-15 pb-5">
                    {project && (project.title)}
                </h2>
                <div className="">
                    <LogList logList={logList} />
                </div>
            </div>
        </div>
    </div>
  )  
}

export default AllLogs