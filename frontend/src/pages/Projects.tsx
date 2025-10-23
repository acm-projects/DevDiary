import React, {type FormEvent, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "/src/styles/Projects.css";
import Nav from "../components/NavBar/Nav.tsx";
import ContentContainer from "../components/Container/ContentContainer.tsx";
import SearchBar from "../components/Search/SearchBar.tsx";
import Project from "../components/Projects/Project.tsx";
import { useLocation } from 'react-router-dom';
const Projects = () => {

  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  // const location = useLocation();
  // const params = new URLSearchParams(location);
  // const searchString = params.get('search');
  const projectList = [{
    id: 0,
    name: "Project 1",
    description: "description...",
    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }, {
      name: "Tag 4",
    }],
    status: "In Progress",
  }, {
    id: 1,
    name: "Project 2",
    description: "description...",
    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }, {
      name: "Tag 4",
    }],
    status: "Completed",

  }, {
    id: 2,
    name: "Project 3",
    description: "description...",
    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }, {
      name: "Tag 4",
    }],
    status: "On Hold",

  }, {
    id: 3,
    name: "Project 4",
    description: "description...",
    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }, {
      name: "Tag 4",
    }, {
      name: "Tag 1",
    }, {
      name: "Tag 1",
    }],
        status: "In Progress",

  }, {id: 4,
    name: "Project 5",
    description: "description...",
    tags: [{
      name: "Tag 1",
    }, {
      name: "Tag 2",
    }, {
      name: "Tag 3",
    }, {
      name: "Tag 4",
    }],
        status: "In Progress",

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
              {projectList.map(project => 
                <div className="w-full aspect-[5/6]">
                  <Project 
                    id = {project.id} 
                    name={project.name} 
                    description={project.description} 
                    tags={project.tags}
                    status={project.status}
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