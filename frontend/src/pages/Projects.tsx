import React, {type FormEvent, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "/src/styles/Projects.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
import SearchBar from "../components/Search/SearchBar.tsx";
import Project from "../components/Projects/Project.tsx";
import ProjectPopUp from "../components/Projects/ProjectPopUp.tsx";

import { useLocation } from 'react-router-dom';
const Projects = () => {

  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  // const location = useLocation();
  // const params = new URLSearchParams(location);
  // const searchString = params.get('search');

  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState<boolean>(true);
  const [errorLogs, setErrorLogs] = useState<string | null>(null);

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpName, setPopUpName] = useState<string>("");
  useEffect(() => {

    setLoadingProjects(true);
    setErrorProjects(null);

    fetch("http://localhost:5000/api/projects", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllProjects(data);
        setLoadingProjects(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setErrorProjects("Error fetching search results");
        setLoadingProjects(false);
      });

    fetch("http://localhost:5000/api/logs", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllLogs(data);
        setLoadingLogs(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setErrorLogs("Error fetching search results");
        setLoadingLogs(false);
      });
  }, []);

  allProjects.map((project) => {
    console.log("project",project);
    project.status = "In Progress";
    const filteredLogs = allLogs.filter((log) => (log.project = project.title));
    if( filteredLogs.filter((log) => (log.status==="Completed")).length == filteredLogs.length) {
      project.status = "Completed";
    }
    if( filteredLogs.filter((log) => (log.status==="On Hold")).length == filteredLogs.length) {
      project.status = "On Hold";
    }
  })

  // console.log("allProjects: "+allProjects);
  // console.log("popUpName: "+popUpName);
  // console.log("popup project: "+allProjects[allProjects.findIndex(obj => obj.title === popUpName)])
  // console.log("project: "+allProjects[0].id);



  return (
    <>
      <div className="flex bg-[#011522] h-screen w-screen">
        {/* Nav Bar */}
        <div className="sticky top-0 h-screen">
          <Nav />
        </div>
        <div className=" relative overflow-y-auto bg-[url('/Variant5.png')] bg-center bg-cover w-full">
          <div className=" ">
            {/* search Bar */}
            <div className="w-3/5 pt-10 mx-auto">
              <SearchBar/>
            </div>
            <div className="grid grid-cols-5 gap-4 p-10 text-white text-2xl justify-items-center">
              {allProjects.map(project => 
                <div className="w-full aspect-[6/5]"
                  onClick={(e) => {setShowPopUp(true); setPopUpName(project.title);}}>
                  <Project 
                    id = {project.id} 
                    name={project.title} 
                    description={project.description} 
                    tags={project.tags.map((tag:any) => ({name: tag}))}
                    status={project.status}
                    emoji={project.emoji}
                    image={project.image}
                  />
                </div>
              )}
            </div>
          </div>
          
            
        </div>
      </div>
      {showPopUp && (
              
                <ProjectPopUp 
                  id = {allProjects[allProjects.findIndex(project => project.title === popUpName)].id}
                  name={allProjects[allProjects.findIndex(project => project.title === popUpName)].title} 
                  description={allProjects[allProjects.findIndex(project => project.title === popUpName)].description} 
                  tags={allProjects[allProjects.findIndex(project => project.title === popUpName)].tags.map((tag:any) => ({name: tag}))}
                  status={allProjects[allProjects.findIndex(project => project.title === popUpName)].status}
                  image={allProjects[allProjects.findIndex(project => project.title === popUpName)].image}
                  emoji={allProjects[allProjects.findIndex(project => project.title === popUpName)].emoji}
                  show={showPopUp}
                  onClose={() => setShowPopUp(false)}
                />
            )}
    </>
  );
};

export default Projects;