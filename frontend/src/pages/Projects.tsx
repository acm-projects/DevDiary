<<<<<<< HEAD
import React, {type FormEvent, useState, useEffect } from "react";
=======
import React, {type FormEvent, useState} from "react";
>>>>>>> routed-pages
import { useNavigate } from 'react-router-dom';
import "/src/styles/Projects.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
import SearchBar from "../components/Search/SearchBar.tsx";
import Project from "../components/Projects/Project.tsx";
<<<<<<< HEAD
import ProjectPopUp from "../components/Projects/ProjectPopUp.tsx";

import { useLocation } from 'react-router-dom';
=======
>>>>>>> routed-pages
const Projects = () => {

  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
<<<<<<< HEAD
  // const location = useLocation();
  // const params = new URLSearchParams(location);
  // const searchString = params.get('search');

  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState<boolean>(true);
  const [errorLogs, setErrorLogs] = useState<string | null>(null);

  const [updatedProjects, setUpdatedProjects] = useState<any[]>([]);

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpName, setPopUpName] = useState<string>("");
  useEffect(() => {

    setLoadingProjects(true);
    setErrorProjects(null);

    console.log("fetch")
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

    // fetch("http://localhost:5000/api/logs", {
    //   method: "GET",
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setAllLogs(data);
    //     setLoadingLogs(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching search results:", error);
    //     setErrorLogs("Error fetching search results");
    //     setLoadingLogs(false);
    //   });
  }, []);

  useEffect(() => {
  if (allProjects.length === 0) return;

  const update = async () => {
    const updated = await Promise.all(
      allProjects.map(async (project) => {
        const logResponses = await Promise.all(
          project.logs.map((logId: string) =>
            fetch(`http://localhost:5000/api/logs/${logId}`)
              .then((res) => (res.ok ? res.json() : null))
              .catch(() => null)
          )
        );

        // filter out failed logs
        const logs = logResponses.filter((log) => log !== null);

        let status = "In Progress";

        const completed = logs.every((log) => log.status === "Completed");
        const onHold = logs.every((log) => log.status === "On Hold");

        if (completed && logs.length > 0) status = "Completed";
        else if (onHold && logs.length > 0) status = "On Hold";

        return {
          ...project,
          status,
        };
      })
    );

    setUpdatedProjects(updated);
  };

  update();
}, [allProjects]);


  

  // console.log("allProjects: "+allProjects);
  // console.log("popUpName: "+popUpName);
  // console.log("popup project: "+allProjects[allProjects.findIndex(obj => obj.title === popUpName)])
  // console.log("project: "+allProjects[0].id);


  console.log("length", updatedProjects);
=======

  const projectList = [{
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
  }, {id: 4,
    name: "Project 5",
    description: "description...",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  }]

>>>>>>> routed-pages
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
<<<<<<< HEAD
            <div className="grid grid-cols-5 gap-4 p-10 text-white text-2xl justify-items-center">
              {updatedProjects.length != 0 && updatedProjects.map(project => 
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
=======
            <div className="grid grid-cols-4 gap-4 p-10 text-white text-2xl justify-items-center space-y-10">
              
              <div className="w-2/3 aspect-[4/3]">
                <Project 
                  id = {-1} 
                  name = "New Project"
                  description = "Create a New Project" 
                  tags={[]}
                />
              </div>
              
              {projectList.map(project => 
                <div className="w-2/3 aspect-[4/3]">
                  <Project 
                    id = {project.id} 
                    name={project.name} 
                    description={project.description} 
                    tags={project.tags}
>>>>>>> routed-pages
                  />
                </div>
              )}
            </div>
          </div>
<<<<<<< HEAD
          
            
        </div>
      </div>
      {showPopUp && (
              
                <ProjectPopUp 
                  id = {updatedProjects[updatedProjects.findIndex(project => project.title === popUpName)].id}
                  name={updatedProjects[updatedProjects.findIndex(project => project.title === popUpName)].title} 
                  description={updatedProjects[updatedProjects.findIndex(project => project.title === popUpName)].description} 
                  tags={updatedProjects[updatedProjects.findIndex(project => project.title === popUpName)].tags.map((tag:any) => ({name: tag}))}
                  status={updatedProjects[updatedProjects.findIndex(project => project.title === popUpName)].status}
                  image={updatedProjects[updatedProjects.findIndex(project => project.title === popUpName)].image}
                  emoji={updatedProjects[updatedProjects.findIndex(project => project.title === popUpName)].emoji}
                  show={showPopUp}
                  onClose={() => setShowPopUp(false)}
                />
            )}
=======
        </div>
      </div>
>>>>>>> routed-pages
    </>
  );
};

export default Projects;