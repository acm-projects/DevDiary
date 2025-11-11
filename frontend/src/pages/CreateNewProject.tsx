import React, { useState } from "react";
import Nav from "../components/NavBar/Nav";
import Dropdown from "../components/Dropdown";
import Cancel from "../components/Cancel";
import TagSearch from "../components/Tags/TagSearch"; 

const CreateNewProject: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  // Hardcoded options for now
  const folder_options = ["Folder 1", "Folder 2", "Folder 3"];
  const tag_options = ["React", "TypeScript", "Node.js", "TailwindCSS", "Express"];

  return (
    <div className="grid grid-cols-[200px_auto] bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] bg-cover h-screen w-screen text-white font-sans">
      {/* Navigation Sidebar */}
      <div className="sticky top-0 h-screen">
        <Nav />
      </div>

      {/* Main Content */}
      <main className="relative h-screen overflow-y-auto p-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white">Create New Project</h1>
            <p className="text-lg text-gray-400 mt-2">
              Organize your development process by creating a new project.
            </p>
          </div>

          <form className="space-y-8">
            {/* General */}
            <div className="bg-[#1E293B]/80 border border-white/25 bg-cover bg-[url(src/assets/Variant4.svg)] rounded-2xl p-8 backdrop-blur-sm shadow-lg shadow-teal-500/10 hover:shadow-[0px_20px_80px_-30px_#6d28d9] transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-teal-300">General Information</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="project-name" className="flex justify-start text-md font-medium text-gray-300 mb-2">Project Name*</label>
                  <input
                    type="text"
                    id="project-name"
                    name="project-name"
                    placeholder="e.g., My Awesome App"
                    className="block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="project-description" className="flex justify-start text-md font-medium text-gray-300 mb-2">Project Description</label>
                  <textarea
                    id="project-description"
                    name="project-description"
                    placeholder="A brief description of what this project is about."
                    rows={3}
                    className="block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-[#1E293B]/80 border border-white/25 bg-cover bg-[url(src/assets/Variant4.svg)] rounded-2xl p-8 backdrop-blur-sm shadow-lg shadow-teal-500/10">
              <h2 className="text-2xl font-semibold mb-6 text-teal-300">Configuration</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="flex justify-start text-lg font-medium">Select Folder</p>
                    <p className="text-sm text-gray-400">Organize your projects with folders.</p>
                  </div>
                  <div className="w-1/3">
                    <Dropdown label="" options={folder_options} onChange={setSelectedFolder} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="flex justify-start text-lg font-medium">Select Tags</p>
                    <p className="text-sm text-gray-400">Categorize with languages and tools.</p>
                  </div>
                  <div className="w-1/3">
                    <TagSearch options={tag_options} />
                  </div>
                </div>
              </div>
            </div>

            {/* Create Project Button */}
            <div className="flex justify-end items-center gap-4 pt-4">
              <Cancel />
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateNewProject;

