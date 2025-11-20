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
  // console.log("image: "+image);
  console.log("emoji",emoji);

  
  const handleClick = (name: string) => {
      navigate('/projects/'+name); 
    }

  return (
    <>
      <div className="h-full w-full bg-[#011522] rounded-3xl">
        <div className="flex justify-start overflow-hidden pb-1">
          <div className="aspect-square w-2/5 rounded-full bg-teal-500/20 mx-2 mt-2 flex justify-center items-center text-5xl flex-none">
            {emoji}
          </div>
          <div className="flex flex-col flex-1 min-w-0 justify-between items-start">
            <div className="text-left text-xl py-2 line-clamp-2 mr-2">
              {name}
            </div>
            <StatusTag status={status}/>
          </div>
        </div>
        <div className="px-2 pt-4">
          <div className="grid grid-cols-2 justify-items-center w-full gap-y-2">
            {tags.slice(0,4).map((tag) => (
              <span key={tag.name} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                <Tag 
                  name={tag.name}
                  selected={-1}
                />
              </span>
            ))}
          </div>
          {tags.length==0 && 
            <div className="text-xs text-center text-cyan-300">
              No Logs Yet | Add some logs to generate tags
            </div>  
          }
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
    </>
  );
};

export default Project;
