import React, {type FormEvent, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "/src/styles/Projects.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
import SearchBar from "../components/Search/SearchBar.tsx";
import Project from "../components/Projects/Project.tsx";
const Projects = () => {

  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');

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
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;