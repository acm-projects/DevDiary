// TODO:
// Make tags a component so they are reusable
// Update colors as needed


import '/src/styles/App.css'
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

<div className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-[url(src/assets/background.png)]">

  <div className="fixed top-[1.5vh] left-[1vw]">
    <Logo />
  </div>
  
  <div className="w-full max-w-xlg max-h-xlg px-30 py-5">
    <h2 className="font-dm-mono text-4xl font-bold text-white text-center m-5">Create New Project</h2>
    <form className="space-y-5">
      <div>
        <label htmlFor="project-name" className="font-headvig block text-sm text-white text-left">Project Name</label>
        <input
          className="bg-[#011522] px-3 py-1 placeholder-gray-400 placeholder:font-headvig font-headvig text-white text-lg w-full rounded-lg border-white"
          type="text" 
          id="project-name" 
          name="project-name" 
          placeholder="Enter project name"
        />
      </div>

      <div>
        <label htmlFor="project-description" className="font-headvig block text-sm text-white text-left">Project Description</label>
        <textarea
          className="bg-[#011522] px-3 py-1 text-lg w-full h-40 resize-none placeholder-gray-400 placeholder:font-headvig font-headvig rounded-lg"
          id="project-description"
          name="project-description"
          placeholder="Enter project description"
        ></textarea>
      </div>

      <div className="flex justify-start-safe">
        <div className="pr-5 font-headvig">
          <Dropdown label="Select folder" options={folder_options} onSelect={setSelected} />
        </div>

        <div className="px-5">
          <label className="font-headvig flex justify-start-safe text-sm">Select Tags</label>
          <TagSearch options={tag_options}/>
        </div>
      </div>

      <div className="flex justify-center items-center mx-4 my-12">
        <div className="mx-2">
          <Cancel />
        </div>
        {/* TODO: route to new log page */}
        <button 
          type="submit" 
          className="mx-2 py-3 px-4 bg-[#011522] text-white font-dm-mono rounded-lg shadow-md hover:bg-[#1E3249] focus:ring-2 focus:ring-blue-500"
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