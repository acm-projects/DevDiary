import React, { type FormEvent, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "/src/styles/Projects.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
import SearchBar from "../components/Search/SearchBar.tsx";
import Project from "../components/Projects/Project.tsx";
import ProjectPopUp from "../components/Projects/ProjectPopUp.tsx";

import { useLocation } from 'react-router-dom';
import FloatingBackground from "components/FloatingBackground.tsx";

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
  return (
    <>
      <div className="flex bg-[#0F172A] h-screen w-screen overflow-hidden">
        {/* Nav Bar */}
        <div className="sticky top-0 h-screen">
          <Nav />
        </div>
        <div className=" relative overflow-y-auto bg-[url('/Variant5.png')] bg-center bg-cover w-full">
          
          {/* Floating Background */}
          <FloatingBackground />

          <div className="relative z-10">
            {/* Header */}
            <div className="pt-10 pb-6 px-10">
              <div className="max-w-7xl mx-auto">

                <div className="mb-8 animate-fade-in-up">
                  <div className="flex justify-center items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-white">All Projects</h1>
                  </div>
                  <p className="text-gray-400">Manage and track your development projects</p>
                </div>

                {/* search Bar */}
                <div className="mb-6 ml-70 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <div className="relative group max-w-2xl">
                    <div className="absolute -inset-0.5 bg-teal-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <SearchBar />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="px-10 pb-10">
              <div className="max-w-7xl mx-auto">
                {loadingProjects ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
                  </div>
                ) : errorProjects ? (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                    <p className="text-red-400">{errorProjects}</p>
                  </div>
                ) : updatedProjects.length === 0 ? (
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-12 text-center backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Projects Yet</h3>
                    <p className="text-gray-500">Create your first project to get started</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {updatedProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className="w-full animate-fade-in-up hover:scale-105 transition-transform duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={(e) => { setShowPopUp(true); setPopUpName(project.title); }}
                      >
                        <div className="group relative bg-[#1E293B]/60 border border-white/10 rounded-xl overflow-hidden hover:border-teal-500/40 transition-all duration-300 cursor-pointer h-full">
                          {/* Glow effect on hover */}
                          <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          
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
    </>
  );
};

export default Projects;