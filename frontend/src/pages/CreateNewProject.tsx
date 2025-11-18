<<<<<<< HEAD
import React, { useState, type ChangeEvent } from "react";
import Nav from "../components/NavBar/Nav";
import Dropdown from "../components/Dropdown";
import Cancel from "../components/Cancel";
import { useNavigate } from "react-router-dom"
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import EmojiText from '../components/EmojiText.tsx'
const CreateNewProject: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File|null>(null);
  const [selectedImageName, setSelectedImageName] = useState<String>("No Image");
  const [tags, setTags] = useState(String);
  const [projectName, setProjectName] = useState(String);
  const [projectDescription, setProjectDescription] = useState(String);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(String);
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Create FormData only when submitting
    const formData = new FormData();
    formData.append("title", projectName);
    formData.append("description", projectDescription);
    tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0).forEach(tag => formData.append("tags", tag));
    formData.append("emoji", selectedEmoji);

    console.log(formData);
    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      body: formData,
    }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        navigate("/projects")
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });;

    
  }
=======
import React, { useState } from "react";
import Nav from "../components/NavBar/Nav";
import Dropdown from "../components/Dropdown";
import Cancel from "../components/Cancel";
import TagSearch from "../components/Tags/TagSearch"; // Assuming you have this component

const CreateNewProject: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  // Hardcoded options for now
  const folder_options = ["Folder 1", "Folder 2", "Folder 3"];
  const tag_options = ["React", "TypeScript", "Node.js", "TailwindCSS", "Express"];
>>>>>>> routed-pages

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

<<<<<<< HEAD
          <form className="space-y-8" onSubmit={handleSubmit}>
=======
          <form className="space-y-8">
>>>>>>> routed-pages
            {/* General */}
            <div className="bg-[#1E293B]/80 border border-white/25 bg-cover bg-[url(src/assets/Variant4.svg)] rounded-2xl p-8 backdrop-blur-sm shadow-lg shadow-teal-500/10 hover:shadow-[0px_20px_80px_-30px_#6d28d9] transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-teal-300">General Information</h2>
              <div className="space-y-6">
                <div>
<<<<<<< HEAD
                  <label htmlFor="project-name" className="flex justify-start text-md font-medium text-gray-300 mb-2">Project Name*</label>
=======
                  <label htmlFor="project-name" className="block text-md font-medium text-gray-300 mb-2">Project Name*</label>
>>>>>>> routed-pages
                  <input
                    type="text"
                    id="project-name"
                    name="project-name"
                    placeholder="e.g., My Awesome App"
                    className="block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition"
<<<<<<< HEAD
                    onChange={(e) => setProjectName(e.target.value)}
=======
>>>>>>> routed-pages
                    required
                  />
                </div>
                <div>
<<<<<<< HEAD
                  <label htmlFor="project-description" className="block text-md font-medium text-gray-300 mb-2">Project Description*</label>
=======
                  <label htmlFor="project-description" className="block text-md font-medium text-gray-300 mb-2">Project Description</label>
>>>>>>> routed-pages
                  <textarea
                    id="project-description"
                    name="project-description"
                    placeholder="A brief description of what this project is about."
                    rows={3}
                    className="block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition resize-none"
<<<<<<< HEAD
                    onChange={(e) => setProjectDescription(e.target.value)}
                    required
=======
>>>>>>> routed-pages
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
<<<<<<< HEAD
                    <p className="text-lg font-medium">Select Emoji</p>
                    <p className="text-sm text-gray-400">Customize the appearance of your project.</p>
                  </div>
                  <div className="w-1/3">
                    {/* <Dropdown label="" options={folder_options} onChange={setSelectedFolder} /> */}
                    {!emojiPickerOpen && (<div className="ile:text-black block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition resize-none hover:cursor-pointer"
                      onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                    >
                      {selectedEmoji != "" && <p className="text-4xl">{selectedEmoji}</p>}
                      {selectedEmoji == "" && "No Emoji Selected"}
                    </div>)}
                    <div>
                      
                      <EmojiPicker 
                        open={emojiPickerOpen}
                        width="w-full"
                        height={350}
                        style={{
                          '--epr-bg-color': 'rgba(1, 21, 34, 0.8)',
                          '--epr-category-label-bg-color': 'rgba(1, 21, 34, 1)',
                        } as React.CSSProperties}
                        onEmojiClick={(e) => {
                          setSelectedEmoji(e.emoji);
                          setEmojiPickerOpen(false);
                        }}
                      />
                      </div>
                    {/* <label
                      htmlFor="file-upload"
                      className="ile:text-black block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition resize-none hover:cursor-pointer"
                    >
                      
                      {selectedImage && selectedImageName}
                      {!selectedImage && "No Image Selected"}
                      <input 
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(event:any) => {
                          setSelectedImage(event.target.files[0]);
                          setSelectedImageName(event.target.files[0].name);
                          // setSelectedImageName(event.target);
                        }}
                      />
                    </label> */}
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div>
                    <p className="flex justify-start text-lg font-medium">Select Tags</p>
                    <p className="text-sm text-gray-400">Categorize with languages and tools.</p>
                  </div>
                  <div className="w-1/3">
                    <input
                      type="text"
                      placeholder="e.g., react, typescript, bug"
                      onChange={(e) => setTags(e.target.value)}
                      className="block w-full p-3 bg-[#011522]/80 border border-teal-500/30 rounded-lg focus:ring-teal-400 focus:border-teal-400 outline-none transition resize-none"
                    />
                  </div>
                </div> */}
=======
                    <p className="text-lg font-medium">Select Folder</p>
                    <p className="text-sm text-gray-400">Organize your projects with folders.</p>
                  </div>
                  <div className="w-1/3">
                    <Dropdown label="" options={folder_options} onChange={setSelectedFolder} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium">Select Tags</p>
                    <p className="text-sm text-gray-400">Categorize with languages and tools.</p>
                  </div>
                  <div className="w-1/3">
                    <TagSearch options={tag_options} />
                  </div>
                </div>
>>>>>>> routed-pages
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

