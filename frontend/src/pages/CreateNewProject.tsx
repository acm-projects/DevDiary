// TODO:
// Make tags a component so they are reusable
// Update colors as needed


import '/src/styles/App.css'
import '/src/styles/CreateNewProject.css'
import { useState } from "react";
import Dropdown from "../components/Dropdown.tsx"
import TagSearch from "../components/TagSearch.tsx"
import Logo from "../components/Logo.tsx"
import Cancel from "../components/Cancel.tsx"
function CreateNewProject() {
  const[selected,  setSelected] = useState<string>("");

  //TODO: get options from backend
  const folder_options = ["Folder 1", "Folder 2", "Folder 3"];
  const tag_options = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

  return (

<div className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-[url(src/assets/gradient2.png)]">

  <div className="fixed top-[1.5vh] left-[1vw]">
    <Logo />
  </div>
  


  <div className="w-3/5 px-30 py-5">

    {/* Create New Project Header */}
    <div className="my-5 space-y-0.5 pl-15">
      <h2 className="font-dm-mono text-4xl text-shadow-lg font-bold text-white text-left">
        Create New Project
      </h2>
      <p className="font-headvig text-m text-shadow-lg text-white text-left">
        Create a new project to store, organize, and track your development process as you learn
      </p>
    </div>

    <form className="space-y-5">


    {/* Section 1: General */}
      <div className="flex flex-row">
        {/* Number and vertical bar */}
        <div className="basis-15 flex-none text-shadow-lg text-4xl">
          1. 
        </div>
        <div className="basis-full">
          <div className="text-left text-3xl text-shadow-lg font-dm-mono pb-2 pt-3">
            General
          </div>
          <div className="space-y-2">
            {/* Project Name */}
            <div className="">
              <label htmlFor="project-name" className="font-headvig text-lg block text-white text-left">Project Name*</label>
              <input
                className="input-field"
                type="text" 
                id="project-name" 
                name="project-name" 
                placeholder="Enter project name"
                required
              />
            </div>
            {/* Project Description */}
            <div className="">
              <label htmlFor="project-description" className="font-headvig block text-lg text-white text-left">Project Description</label>
              <input
                className="input-field"
                id="project-description"
                name="project-description"
                placeholder="Enter project description"
              ></input>
            </div>
          </div>
        </div>
      </div>


      {/* Section 2: Configuration */}
      <div className="flex flex-row">
        {/* Number and vertical bar */}
        <div className="basis-15 flex-none text-shadow-lg text-4xl">
          2. 
        </div>
        <div className="basis-full">
          <div className="text-left text-3xl text-shadow-lg font-dm-mono pb-2 pt-3">
            Configuration
          </div>
          <div className="space-y-3">
            <div className="flex items-center w-full bg-[#011522]/50 px-2 border-[#011522] border-2 rounded-2xl p-1 font-headvig">
              <div className="flex-auto text-left self-center">        {/* Dropdown description*/}
                <p className="text-lg">Select Folder</p>
                <p className="text-sm">Organize your projects with folders</p>
              </div>
              <div className="font-headvig basis-25">     {/* Dropdown */}
                {/* TODO: add new project option */}
                <Dropdown label="" options={folder_options} onSelect={setSelected} />
              </div>
            </div>
            <div className="flex items-center w-full bg-[#011522]/50 px-2 border-[#011522] border-2 rounded-2xl p-1 font-headvig">
              <div className="flex-auto text-left self-center">        {/* Dropdown description*/}
                <p className="text-lg">Select Tags</p>
                <p className="text-sm">Categorize your project with languages and tools</p>
              </div>
              <div className="">
                <label className="font-headvig flex justify-start-safe text-sm">Select Tags</label>
                {/* TODO: Fix with tag components
                          Add another box with selected tags */}
                <TagSearch options={tag_options}/>
              </div>
            </div>
          </div>
        </div>
      </div>      

      <div className="flex justify-end items-center space-x-3 pt-5">
        <div className="mx-2 font-dm-mono">
          <Cancel />
        </div>
        {/* TODO: route to new log page */}
        <button 
          type="submit" 
          className="mx-2 px-4 self-stretch bg-[#011522] text-white font-dm-mono rounded-lg shadow-md hover:bg-[#1E3249] focus:ring-2 focus:ring-blue-500"
        >
          Create Project
        </button>
      </div>
    </form>
  </div>
</div>
)  
}

export default CreateNewProject