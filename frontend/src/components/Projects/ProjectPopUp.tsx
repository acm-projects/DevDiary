import React from "react";
import Tag from "../Tags/Tag.tsx"
import type { TagProps } from "../Tags/Tag.tsx"
import StatusTag from "components/StatusTag.tsx";
import { useNavigate } from "react-router-dom";

export interface ProjectPopUpProps {
  id: number;
  name: string;
  description: string;
  tags: TagProps[];
  status: string;
  image: any;
  emoji: string;
  show: boolean;
  onClose?: () => void;
}

const ProjectPopUp = ({id, name, description, tags, status, image, emoji, show, onClose}: ProjectPopUpProps,) => {
  if (!show) return null;
  const navigate = useNavigate();
  // console.log("image: "+image);


  const handleClick = (id: number) => {
    navigate('/projects/'+id);
  }

  // Prevent background from scrolling when open
  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose} >
        <div className="bg-[#1E293B]/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 border border-white/10 animate-scale-in"
          onClick={(e) => e.stopPropagation()} >
          <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-teal-500/20 flex items-center justify-center text-5xl border border-teal-500/30 shadow-lg">
                  {emoji}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-teal-400/20 blur-xl"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-3xl font-bold text-white line-clamp-2 flex-1">
                    {name}
                  </h2>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => navigate('/edit-project/' + id)}
                      className="p-2 hover:bg-teal-500/20 rounded-lg transition-all duration-200 group border border-transparent hover:border-teal-500/30"
                      title="Edit Project"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-teal-400 transition-colors">
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 group border border-transparent hover:border-red-500/30"
                      title="Close"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-red-400 transition-colors">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <StatusTag status={status} />
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Tags
              </h3>

              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 12).map((tag) => (
                    <span
                      key={tag.name}
                      className="px-3 py-1.5 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/50 hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-200"
                    >
                      <Tag
                        name={tag.name}
                        selected={-1}
                      />
                    </span>
                  ))}
                  {tags.length > 12 && (
                    <span className="px-3 py-1.5 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full border border-gray-500/50">
                      +{tags.length - 12} more
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>No tags yet! Add logs to generate tags automatically</span>
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 flex items-center justify-center gap-2"
                onClick={(e) => handleClick(id)}
              >
                View Logs
              </button>
              {/* <button className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
              onClick={(e) => navigate('/edit-project/'+id)}
            >
              Edit Project
            </button> */}
              <button className="px-6 py-3 bg-gray-800/50 hover:bg-gray-800 text-gray-300 font-semibold rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200"
                onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-row bg-[#011522]">
        <div className="p-3">
          {image && (<img src={image} alt="alt text" className="rounded-3xl aspect-square"/>)}
          {!image && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-folder-icon lucide-folder"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>)}
        </div>

        <div className="flex flex-col justify-between py-5">
 <div className="text-white text-center text-2xl text-nowrap">
          {name}
          <span><StatusTag status={status}/></span>
        </div>
        <div className="text-gray-100 text-lg text-left px-4 truncate">
          {description}
        </div>

        <div className="grid grid-cols-3 justify-items-center w-full gap-y-2">
          {tags.map((tag) => (
            <span key={tag.name} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
              <Tag 
                name={tag.name}
                selected={-1}
              />
            </span>
          ))}
        </div>
        
        <div className="flex justify-center align-middle mb-4">
          <button className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
            onClick={(e) => handleClick(name)}
          >
            View Logs
          </button>
          <button className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
            onClick={onClose}
          >
            View Logs
          </button>
        </div>
        </div> 
      </div>*/}

      </div>
    </>
  );
};

export default ProjectPopUp;
