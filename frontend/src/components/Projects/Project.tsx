import React from "react";
import Tag from "../Tags/Tag.tsx"
import type {TagProps} from "../Tags/Tag.tsx"
import StatusTag from "components/StatusTag.tsx";
import { useNavigate } from "react-router-dom";

export interface ProjectProps {
    id: number;
    name: string;
    description: string;
    tags: TagProps[];
    status: string;
    emoji: string;
    image: any;
}

const Project = ({id, name, description, tags, status, emoji, image}: ProjectProps) => {
  const navigate = useNavigate();

  const handleClick = (name: string) => {
      navigate('/projects/'+name); 
    }

  return (
    <div className="h-full w-full bg-[#1E293B]/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden group hover:border-teal-500/40 transition-all duration-300 relative">
      {/*  gradient overlay when hovering */}
      <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>    

      <div className="relative p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-teal-500/20 flex items-center justify-center text-3xl border border-teal-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              {emoji}
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-teal-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2 group-hover:text-teal-300 transition-colors duration-300">
              {name}
            </h3>
            <StatusTag status={status}/>
          </div>
        </div>

        {description && (
          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* Tags */}
        <div className="flex-1 flex items-end">
          <div className="w-full">
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 4).map((tag) => (
                  <span 
                    key={tag.name} 
                    className="px-2.5 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/50 hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-200"
                  >
                    <Tag 
                      name={tag.name}
                      selected={-1}
                    />
                  </span>
                ))}
                {/* Show +(# of additional tags) if more than 4 tags */}
                {tags.length > 4 && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full border border-gray-500/50">
                    +{tags.length - 4}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-800/30 rounded-lg p-2 border border-gray-700/50">
                <span>No tags yet</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      {/* <div className="h-full w-full shrink-0 rounded-3xl cursor-pointer hover:scale-105 ease-in-out duration-200 bg-[#011522] flex flex-col justify-start gap-1">
        <div className="p-3">
          {image && (<img src={image} alt="alt text" className="rounded-3xl aspect-square"/>)}
          {!image && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-folder-icon lucide-folder"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>)}
          
        </div>
        <div className="text-white text-center text-2xl text-nowrap">
          {name}
        </div>
      </div> */}
    </div>
  );
};

export default Project;
